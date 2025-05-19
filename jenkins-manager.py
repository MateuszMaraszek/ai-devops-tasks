#!/usr/bin/env python3

import jenkins
import argparse
import sys
import json
import time
from typing import Dict, List, Optional, Any
from datetime import datetime
from rich.console import Console
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.panel import Panel
from rich import print as rprint

class JenkinsManager:
    def __init__(self, url: str, username: str, api_token: str):
        """
        Inicjalizacja managera Jenkins.
        
        Args:
            url: URL serwera Jenkins
            username: Nazwa użytkownika
            api_token: Token API
        """
        self.console = Console()
        try:
            self.jenkins = jenkins.Jenkins(
                url,
                username=username,
                password=api_token
            )
            # Test połączenia
            self.jenkins.get_whoami()
            self.console.print("[green]Połączono z Jenkins pomyślnie[/green]")
        except jenkins.JenkinsException as e:
            self.console.print(f"[red]Błąd połączenia z Jenkins: {str(e)}[/red]")
            sys.exit(1)

    def list_jobs(self, view: Optional[str] = None) -> List[Dict]:
        """
        Pobiera listę zadań, opcjonalnie filtrując po widoku.
        
        Args:
            view: Nazwa widoku do filtrowania
            
        Returns:
            Lista zadań
        """
        try:
            if view:
                jobs = self.jenkins.get_jobs(view_name=view)
            else:
                jobs = self.jenkins.get_jobs()
            return jobs
        except jenkins.JenkinsException as e:
            self.console.print(f"[red]Błąd podczas pobierania listy zadań: {str(e)}[/red]")
            return []

    def get_job_details(self, job_name: str) -> Optional[Dict]:
        """
        Pobiera szczegółowe informacje o zadaniu.
        
        Args:
            job_name: Nazwa zadania
            
        Returns:
            Słownik z informacjami o zadaniu
        """
        try:
            job_info = self.jenkins.get_job_info(job_name, depth=2)
            return {
                'name': job_info['name'],
                'description': job_info.get('description', ''),
                'url': job_info['url'],
                'last_build': {
                    'number': job_info['lastBuild']['number'],
                    'status': job_info['lastBuild']['result'],
                    'timestamp': datetime.fromtimestamp(job_info['lastBuild']['timestamp']/1000).strftime('%Y-%m-%d %H:%M:%S'),
                    'duration': f"{job_info['lastBuild']['duration']/1000:.2f}s"
                } if job_info.get('lastBuild') else None,
                'health': job_info.get('healthReport', []),
                'parameters': [p['name'] for p in job_info.get('property', []) if 'parameterDefinitions' in p]
            }
        except jenkins.JenkinsException as e:
            self.console.print(f"[red]Błąd podczas pobierania szczegółów zadania {job_name}: {str(e)}[/red]")
            return None

    def build_job(self, job_name: str, parameters: Optional[Dict] = None) -> Optional[int]:
        """
        Uruchamia zadanie i zwraca numer buildu.
        
        Args:
            job_name: Nazwa zadania
            parameters: Parametry dla buildu
            
        Returns:
            Numer buildu lub None w przypadku błędu
        """
        try:
            if parameters:
                queue_item = self.jenkins.build_job(job_name, parameters=parameters)
            else:
                queue_item = self.jenkins.build_job(job_name)
            
            if queue_item:
                with Progress(
                    SpinnerColumn(),
                    TextColumn("[progress.description]{task.description}"),
                    console=self.console
                ) as progress:
                    task = progress.add_task("Oczekiwanie na rozpoczęcie buildu...", total=None)
                    while True:
                        queue_info = self.jenkins.get_queue_item(queue_item)
                        if queue_info.get('executable'):
                            return queue_info['executable']['number']
                        time.sleep(1)
            return None
        except jenkins.JenkinsException as e:
            self.console.print(f"[red]Błąd podczas uruchamiania zadania {job_name}: {str(e)}[/red]")
            return None

    def get_build_logs(self, job_name: str, build_number: int) -> Optional[str]:
        """
        Pobiera logi z buildu.
        
        Args:
            job_name: Nazwa zadania
            build_number: Numer buildu
            
        Returns:
            Logi buildu lub None w przypadku błędu
        """
        try:
            return self.jenkins.get_build_console_output(job_name, build_number)
        except jenkins.JenkinsException as e:
            self.console.print(f"[red]Błąd podczas pobierania logów: {str(e)}[/red]")
            return None

    def monitor_build(self, job_name: str, build_number: int) -> bool:
        """
        Monitoruje postęp buildu.
        
        Args:
            job_name: Nazwa zadania
            build_number: Numer buildu
            
        Returns:
            True jeśli build zakończył się sukcesem, False w przeciwnym razie
        """
        try:
            with Progress(
                SpinnerColumn(),
                TextColumn("[progress.description]{task.description}"),
                console=self.console
            ) as progress:
                task = progress.add_task("Monitorowanie buildu...", total=None)
                while True:
                    build_info = self.jenkins.get_build_info(job_name, build_number)
                    if build_info['building']:
                        time.sleep(1)
                        continue
                    
                    result = build_info['result']
                    if result == 'SUCCESS':
                        self.console.print("[green]Build zakończony sukcesem![/green]")
                        return True
                    else:
                        self.console.print(f"[red]Build zakończony z wynikiem: {result}[/red]")
                        return False
        except jenkins.JenkinsException as e:
            self.console.print(f"[red]Błąd podczas monitorowania buildu: {str(e)}[/red]")
            return False

    def display_jobs_table(self, jobs: List[Dict]):
        """
        Wyświetla tabelę z zadaniami.
        
        Args:
            jobs: Lista zadań do wyświetlenia
        """
        table = Table(title="Lista zadań Jenkins")
        table.add_column("Nazwa", style="cyan")
        table.add_column("Status", style="green")
        table.add_column("Ostatni build", style="yellow")
        table.add_column("Czas", style="magenta")
        table.add_column("Zdrowie", style="blue")

        for job in jobs:
            details = self.get_job_details(job['name'])
            if details:
                health = next((h['description'] for h in details['health']), 'Brak')
                table.add_row(
                    details['name'],
                    details['last_build']['status'] if details['last_build'] else 'Brak',
                    str(details['last_build']['number']) if details['last_build'] else 'Brak',
                    details['last_build']['timestamp'] if details['last_build'] else 'Brak',
                    health
                )

        self.console.print(table)

def main():
    parser = argparse.ArgumentParser(description='Manager Jenkins')
    parser.add_argument('--url', required=True, help='URL serwera Jenkins')
    parser.add_argument('--username', required=True, help='Nazwa użytkownika')
    parser.add_argument('--token', required=True, help='Token API')
    parser.add_argument('--action', required=True, 
                      choices=['list', 'details', 'build', 'monitor', 'logs'],
                      help='Akcja do wykonania')
    parser.add_argument('--job', help='Nazwa zadania')
    parser.add_argument('--view', help='Nazwa widoku (dla akcji list)')
    parser.add_argument('--build', type=int, help='Numer buildu (dla akcji monitor i logs)')
    parser.add_argument('--parameters', help='Parametry dla buildu w formacie JSON')

    args = parser.parse_args()
    manager = JenkinsManager(args.url, args.username, args.token)

    if args.action == 'list':
        jobs = manager.list_jobs(args.view)
        manager.display_jobs_table(jobs)
    
    elif args.action == 'details':
        if not args.job:
            rprint("[red]Nazwa zadania jest wymagana dla akcji details[/red]")
            sys.exit(1)
        details = manager.get_job_details(args.job)
        if details:
            rprint(Panel(json.dumps(details, indent=2, ensure_ascii=False)))
    
    elif args.action == 'build':
        if not args.job:
            rprint("[red]Nazwa zadania jest wymagana dla akcji build[/red]")
            sys.exit(1)
        parameters = json.loads(args.parameters) if args.parameters else None
        build_number = manager.build_job(args.job, parameters)
        if build_number:
            rprint(f"[green]Build uruchomiony z numerem: {build_number}[/green]")
    
    elif args.action == 'monitor':
        if not args.job or not args.build:
            rprint("[red]Nazwa zadania i numer buildu są wymagane dla akcji monitor[/red]")
            sys.exit(1)
        manager.monitor_build(args.job, args.build)
    
    elif args.action == 'logs':
        if not args.job or not args.build:
            rprint("[red]Nazwa zadania i numer buildu są wymagane dla akcji logs[/red]")
            sys.exit(1)
        logs = manager.get_build_logs(args.job, args.build)
        if logs:
            rprint(Panel(logs, title=f"Logi buildu {args.build}"))

if __name__ == '__main__':
    main() 