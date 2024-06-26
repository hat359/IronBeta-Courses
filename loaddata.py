import pandas as pd
import requests
from datetime import datetime, timezone
# Read CSV file into a pandas DataFrame
csv_file = '/Users/harsh/Desktop/IronBeta/Courses/course_master.csv'
df = pd.read_csv(csv_file)

# API endpoint for adding a course
add_course_api = 'http://localhost:3000/api/v1/courses/add'

# Function to provide default values if a cell is empty
def get_value(row, column_name, default_value):
    return str(row[column_name]) if pd.notna(row[column_name]) else default_value

def get_utc_datetime(value):
    local_datetime = datetime.strptime(value, '%d/%m/%y %H:%M')


    utc_datetime = local_datetime.astimezone(timezone.utc)

    return utc_datetime.isoformat()

# Iterate through each row in the DataFrame and send a POST request to add the course
for index, row in df.iterrows():
    try:
        # Transform row data into JSON format with default values for empty cells
        course_data = {
            "courseCode": get_value(row, 'course_code', 'Unknown Code'),
            "name": get_value(row, 'course_desc', 'No Name'),
            "description": get_value(row, 'course_ldescr', 'No Description'),
            "attributes": {
                "availableCredits": get_value(row, 'available_course_credit_value', 0),
                "courseLevel": get_value(row, 'course_level_type_value', 'Unknown Level'),
                "maxGPAWeight": get_value(row, 'max_gpa_weighted_value', 0.0),
                "courseLength": get_value(row, 'course_length_value', 'Unknown Length'),
                "categoryType": get_value(row, 'course_cat_type', 'Unknown Type'),
                "courseCategory": get_value(row, 'course_cat_type_name', 'Unknown Category'),
                "courseSubCategory": get_value(row, 'course_subcat_name', 'Unknown Subcategory'),
                "createdOn": "06/03/2024",
                "updatedOn": "06/03/2024",
                "state": get_value(row, 'statecode', 'Unknown State'),
                "County": "Alachua",  # Default value
                "institution": "UFL"  # Default value
            },
            "reviews": [],
            "faqs": [],
           "expiryDate": "06/03/2034",
            "createdOn": "06/03/2024",
            "updatedOn": "06/03/2024"
        }
        # Print course data for debugging
        print(course_data)

        # Send POST request to add_course_api
        response = requests.post(add_course_api, json=course_data)

        # Check if the request was successful
        if response.status_code == 200:
            print(f"Course added successfully: {row['course_desc']}")
        else:
            print(f"Failed to add course: {row['course_desc']}. Status Code: {response.status_code} - {response.text}")

    except Exception as e:
        print(f"Error adding course: {row['course_desc']}. Exception: {e}")
