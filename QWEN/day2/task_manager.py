import json
import os

TASKS_FILE = 'tasks.json'

def load_tasks():
    """Loads tasks from the JSON file."""
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []  # Return empty list if file is corrupted
    return []

def save_tasks(tasks):
    """Saves the list of tasks to the JSON file."""
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f, indent=4)

def add_task(tasks, description):
    """Adds a new task to the list."""
    task_id = len(tasks) + 1
    tasks.append({'id': task_id, 'description': description, 'completed': False})
    save_tasks(tasks)
    print(f'Task added: "{description}" (ID: {task_id})')

def list_tasks(tasks):
    """Prints all tasks to the console."""
    if not tasks:
        print('No tasks found.')
        return

    print('\n--- Your Tasks ---')
    for task in tasks:
        status = '✓' if task['completed'] else ' '
        print(f'{task["id"]}. [{status}] {task["description"]}')
    print('------------------\n')

def remove_task(tasks, task_id):
    """Removes a task by its ID."""
    original_length = len(tasks)
    tasks[:] = [task for task in tasks if task['id'] != task_id]  # Modify list in place

    if len(tasks) < original_length:
        # Renumber remaining tasks
        for i, task in enumerate(tasks):
            task['id'] = i + 1
        save_tasks(tasks)
        print(f'Task ID {task_id} removed.')
    else:
        print(f'Task ID {task_id} not found.')

def mark_completed(tasks, task_id):
    """Marks a task as completed."""
    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = True
            save_tasks(tasks)
            print(f'Task ID {task_id} marked as completed.')
            return
    print(f'Task ID {task_id} not found.')

def show_help():
    """Displays the help message."""
    help_text = """
Task Manager - Interactive CLI
Commands:
  add <description>   - Add a new task
  list                - List all tasks
  remove <id>         - Remove a task by ID
  complete <id>       - Mark a task as completed
  help                - Show this help message
  exit                - Exit the program

Examples:
  add Buy groceries
  list
  remove 2
  complete 1
"""
    print(help_text)

def interactive_mode():
    """Runs the interactive CLI loop."""
    tasks = load_tasks()
    show_help()
    while True:
        try:
            user_input = input("task-manager> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nExiting Task Manager.")
            break

        if not user_input:
            continue

        parts = user_input.split()
        command = parts[0].lower()

        if command == 'add':
            if len(parts) < 2:
                print('Error: Please provide a task description.')
                continue
            description = ' '.join(parts[1:])
            add_task(tasks, description)
        elif command == 'list':
            list_tasks(tasks)
        elif command == 'remove':
            if len(parts) < 2 or not parts[1].isdigit():
                print('Error: Please provide a valid task ID to remove.')
                continue
            task_id = int(parts[1])
            remove_task(tasks, task_id)
        elif command == 'complete':
            if len(parts) < 2 or not parts[1].isdigit():
                print('Error: Please provide a valid task ID to mark complete.')
                continue
            task_id = int(parts[1])
            mark_completed(tasks, task_id)
        elif command == 'help':
            show_help()
        elif command == 'exit':
            print("Goodbye!")
            break
        else:
            print(f'Unknown command: {command}')
            show_help()

def main():
    """Main function to parse arguments and call appropriate actions."""
    import sys

    if len(sys.argv) == 1:
        # No arguments: start interactive mode
        interactive_mode()
        return

    command = sys.argv[1].lower()
    tasks = load_tasks()

    if command == 'add':
        if len(sys.argv) < 3:
            print('Error: Please provide a task description.')
            return
        description = ' '.join(sys.argv[2:])
        add_task(tasks, description)
    elif command == 'list':
        list_tasks(tasks)
    elif command == 'remove':
        if len(sys.argv) < 3 or not sys.argv[2].isdigit():
            print('Error: Please provide a valid task ID to remove.')
            return
        task_id = int(sys.argv[2])
        remove_task(tasks, task_id)
    elif command == 'complete':
        if len(sys.argv) < 3 or not sys.argv[2].isdigit():
            print('Error: Please provide a valid task ID to mark complete.')
            return
        task_id = int(sys.argv[2])
        mark_completed(tasks, task_id)
    elif command == 'help':
        show_help()
    else:
        print(f'Unknown command: {command}')
        show_help()

if __name__ == '__main__':
    main()