import time
import MySQLdb

max_retries = 5
wait_seconds = 10

def check_db():
    try:
        MySQLdb.connect(
            host="db",
            user="backend",
            passwd="restauracja",
            db="eaternet",
            port=3307,
        )
        print("Database is ready!")
        return True
    except MySQLdb.OperationalError as e:
        print(f"Error connecting to the database: {e}")
        return False

retry_count = 0
while retry_count < max_retries:
    if check_db():
        break
    time.sleep(wait_seconds)
    retry_count += 1
    print(f"Retrying to connect to the database ({retry_count}/{max_retries})...")

if retry_count == max_retries:
    print("Failed to connect to the database.")
    exit(1)
