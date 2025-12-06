import os
import re

def assemble_site():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(base_dir, 'index.template.html')
    output_path = os.path.join(base_dir, 'index.html')
    
    print(f"Reading template from {template_path}")
    
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find <!-- include: path/to/file.html -->
        # Supports spaces and flexible path chars
        pattern = r'<!--\s*include:\s*([\w/\\.-]+)\s*-->'
        
        def replace_include(match):
            file_path = match.group(1).strip()
            # Normalize path for OS
            abs_file_path = os.path.join(base_dir, file_path)
            
            print(f"  Including {file_path}")
            
            if os.path.exists(abs_file_path):
                with open(abs_file_path, 'r', encoding='utf-8') as inc_f:
                    return inc_f.read()
            else:
                print(f"  WARNING: File not found: {abs_file_path}")
                return f"<!-- ERROR: Could not include {file_path} -->"

        new_content = re.sub(pattern, replace_include, content)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"Successfully generated {output_path}")
        
    except Exception as e:
        print(f"Error assembling site: {e}")

if __name__ == "__main__":
    assemble_site()
