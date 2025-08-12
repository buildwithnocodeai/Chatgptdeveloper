# Enhanced Memory Palace Generator
# A tool to help memorize information using the Method of Loci technique

import json
import os
import random

# Constants
PALACE_FILE = 'memory_palace.json'

def create_palace(name, areas_list=None):
    # Create a new memory palace with default or custom areas
    if areas_list is None:
        areas_list = ['Entrance Hall', 'Library', 'Kitchen', 'Garden']
    
    palace = {
        'name': name,
        'areas': []
    }
    
    for area_name in areas_list:
        palace['areas'].append({
            'name': area_name,
            'items': [],
            'max_items': 10  # Default max items per area
        })
    
    # Save to file
    with open(PALACE_FILE, 'w') as f:
        json.dump(palace, f, indent=4)
    
    print('Created new memory palace: ' + name)
    if areas_list != ['Entrance Hall', 'Library', 'Kitchen', 'Garden']:
        areas_str = ', '.join(areas_list)
        print('With custom areas: ' + areas_str)

def load_palace():
    # Load palace from file
    if os.path.exists(PALACE_FILE):
        with open(PALACE_FILE, 'r') as f:
            return json.load(f)
    else:
        print('No palace found. Please create one first.')
        return None

def add_items(items):
    # Add items to the palace
    palace = load_palace()
    if not palace:
        return
    
    # Flatten all areas' items to see how many we have
    all_items = []
    for area in palace['areas']:
        all_items.extend(area['items'])
    
    # Add new items to areas
    item_index = 0
    for area in palace['areas']:
        while len(area['items']) < area['max_items'] and item_index < len(items):
            area['items'].append(items[item_index])
            item_index += 1
    
    # Save updated palace
    with open(PALACE_FILE, 'w') as f:
        json.dump(palace, f, indent=4)
    
    count = min(len(items), item_index)
    print('Added ' + str(count) + ' items to memory palace.')

def show_palace():
    # Display the palace structure
    palace = load_palace()
    if not palace:
        return
    
    print('\n--- ' + palace['name'] + ' ---')
    for area in palace['areas']:
        header = '\n' + area['name'] + ' (' + str(len(area['items'])) + '/' + str(area['max_items']) + ' items):'
        print(header)
        if area['items']:
            for i, item in enumerate(area['items']):
                line = '  ' + str(i+1) + '. ' + item
                print(line)
        else:
            print('  (No items)')

def visualize_walk():
    # Visualize walking through the palace
    palace = load_palace()
    if not palace:
        return
    
    print('\n--- Visualization: Walking Through Your Memory Palace ---')
    intro = 'Imagine yourself entering your "' + palace['name'] + '"...\n'
    print(intro)
    
    for i, area in enumerate(palace['areas']):
        print('You enter the ' + area['name'] + '...')
        if area['items']:
            print('As you look around, you notice:')
            for j, item in enumerate(area['items']):
                # Add some variation to the descriptions
                positions = ['on the table', 'on the shelf', 'hanging on the wall', 'in the corner', 'near the entrance']
                position = positions[j % len(positions)] if j < len(positions) else positions[0]
                print('  - "' + item + '" ' + position)
        else:
            print('The room seems empty and quiet.')
        
        # Add transition to next room
        if i < len(palace['areas']) - 1:
            next_area = palace['areas'][i+1]['name']
            transitions = [
                'You walk through a doorway into the ' + next_area + '.',
                'You take a left turn and enter the ' + next_area + '.',
                'A corridor leads you to the ' + next_area + '.',
                'You pass through an archway into the ' + next_area + '.'
            ]
            print(random.choice(transitions) + '\n')
        else:
            print('You have completed your walk through the palace.\n')

def quiz_mode():
    # Test recall with a quiz
    palace = load_palace()
    if not palace:
        return
    
    # Collect all items with their locations
    items_with_locations = []
    for area in palace['areas']:
        for item in area['items']:
            items_with_locations.append({
                'item': item,
                'area': area['name']
            })
    
    if not items_with_locations:
        print('No items in palace to quiz on.')
        return
    
    print('\n--- Quiz Mode ---')
    print('I will ask you to recall items in specific locations.')
    print('Answer with the item name, or "skip" to move to the next question.')
    
    # Shuffle items for random quiz order
    random.shuffle(items_with_locations)
    
    correct = 0
    total = min(5, len(items_with_locations))  # Quiz on up to 5 items
    
    for i in range(total):
        question = items_with_locations[i]
        prompt = '\nWhat item is in the ' + question['area'] + '? '
        answer = input(prompt)
        
        if answer.lower() == 'skip':
            print('Skipped. The item was: ' + question['item'])
        elif answer.lower() == question['item'].lower():
            print('Correct!')
            correct += 1
        else:
            print('Incorrect. The correct answer was: ' + question['item'])
    
    result = '\nQuiz complete! You got ' + str(correct) + ' out of ' + str(total) + ' correct.'
    print(result)

def show_help():
    # Display help message
    help_text = """
Enhanced Memory Palace Generator
A tool to help memorize information using the Method of Loci technique.

Usage:
  python memory_palace.py create <palace_name> [--areas "Area1,Area2,..."]
  python memory_palace.py add <item1> <item2> ... <itemN>
  python memory_palace.py show
  python memory_palace.py walk
  python memory_palace.py quiz
  python memory_palace.py help

Examples:
  python memory_palace.py create "My Study Palace"
  python memory_palace.py create "My House" --areas "Living Room,Bedroom,Kitchen,Bathroom"
  python memory_palace.py add "Buy groceries" "Finish report" "Call mom"
  python memory_palace.py show
  python memory_palace.py walk
  python memory_palace.py quiz
"""
    print(help_text)

def main():
    # Main function to parse arguments and call appropriate actions
    import sys
    
    if len(sys.argv) < 2:
        show_help()
        return

    command = sys.argv[1].lower()
    
    if command == 'create':
        if len(sys.argv) < 3:
            print('Error: Please provide a name for your memory palace.')
            return
        name = sys.argv[2]
        
        # Check for custom areas
        areas_list = None
        if '--areas' in sys.argv:
            try:
                areas_index = sys.argv.index('--areas')
                if areas_index + 1 < len(sys.argv):
                    areas_str = sys.argv[areas_index + 1]
                    areas_list = [area.strip() for area in areas_str.split(',')]
                else:
                    print('Error: Please provide a comma-separated list of areas after --areas')
                    return
            except ValueError:
                print('Error: Invalid --areas parameter')
                return
        
        create_palace(name, areas_list)
    elif command == 'add':
        if len(sys.argv) < 3:
            print('Error: Please provide items to add to the memory palace.')
            return
        items = sys.argv[2:]
        add_items(items)
    elif command == 'show':
        show_palace()
    elif command == 'walk':
        visualize_walk()
    elif command == 'quiz':
        quiz_mode()
    elif command == 'help':
        show_help()
    else:
        print('Unknown command: ' + command)
        show_help()

if __name__ == '__main__':
    main()