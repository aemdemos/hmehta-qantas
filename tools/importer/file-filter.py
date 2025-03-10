import json

def filter_gallery_urls(file_path):
    # Read the JSON file
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    # Filter URLs to keep only those containing 'gallery'
    gallery_urls = [url_obj for url_obj in data['urls'] 
                   if '/gallery/' in url_obj['url']]
    
    # Update the URLs list while keeping other properties
    data['urls'] = gallery_urls
    
    # Write back to the file with pretty printing
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

# Run the script
file_path = 'tools/importer/site-urls.json'
filter_gallery_urls(file_path)