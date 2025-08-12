# Simple Task Manager with File Persistence

import json
import os

TASKS_FILE = 'tasks.json'
tasks = []

def load_tasks():
    global tasks
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as f:
            try:
                tasks = json.load(f)
            except json.JSONDecodeError:
                tasks = []  # Return empty list if file is corrupted

def save_tasks():
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f, indent=4)

def add_task(description):
    task_id = len(tasks) + 1
    tasks.append({'id': task_id, 'description': description, 'completed': False})
    save_tasks()
    print('Task added: "' + description + '" (ID: ' + str(task_id) + ')')

def list_tasks():
    if not tasks:
        print('No tasks found.')
        return

    print('\\n--- Your Tasks ---')
    for task in tasks:
        status = 'X' if task['completed'] else ' '
        print(str(task['id']) + '. [' + status + '] ' + task['description'])
    print('------------------\\n')

def remove_task(task_id):
    global tasks
    original_length = len(tasks)
    tasks = [task for task in tasks if task['id'] != task_id]

    if len(tasks) < original_length:
        # Renumber remaining tasks
        for i, task in enumerate(tasks):
            task['id'] = i + 1
        save_tasks()
        print('Task ID ' + str(task_id) + ' removed.')
    else:
        print('Task ID ' + str(task_id) + ' not found.')

def mark_completed(task_id):
    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = True
            save_tasks()
            print('Task ID ' + str(task_id) + ' marked as completed.')
            return
    print('Task ID ' + str(task_id) + ' not found.')

def show_help():
    help_text = """
Simple Task Manager - CLI
Usage:
  python simple_task_manager.py add <description>
  python simple_task_manager.py list
  python simple_task_manager.py remove <id>
  python simple_task_manager.py complete <id>
  python simple_task_manager.py help

Examples:
  python simple_task_manager.py add "Buy groceries"
  python simple_task_manager.py list
  python simple_task_manager.py remove 2
  python simple_task_manager.py complete 1
"""
    print(help_text)

def main():
    # Load tasks from file at startup
    load_tasks()
    
    import sys

    if len(sys.argv) < 2:
        show_help()
        return

    command = sys.argv[1].lower()

    if command == 'add':
        if len(sys.argv) < 3:
            print('Error: Please provide a task description.')
            return
        description = ' '.join(sys.argv[2:])
        add_task(description)
    elif command == 'list':
        list_tasks()
    elif command == 'remove':
        if len(sys.argv) < 3 or not sys.argv[2].isdigit():
            print('Error: Please provide a valid task ID to remove.')
            return
        task_id = int(sys.argv[2])
        remove_task(task_id)
    elif command == 'complete':
        if len(sys.argv) < 3 or not sys.argv[2].isdigit():
            print('Error: Please provide a valid task ID to mark complete.')
            return
        task_id = int(sys.argv[2])
        mark_completed(task_id)
    elif command == 'help':
        show_help()
    else:
        print('Unknown command: ' + command)
        show_help()

if __name__ == '__main__':
    main()