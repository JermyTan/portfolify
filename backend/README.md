## Setup

Ensure you have [python 3.8](https://www.python.org/downloads/release/python-385/) installed on your local machine.

Then execute:

For mac, **`python3 -m venv venv`**

For windows, **`py -m venv venv`**

To create a virtual environment.

Next, depending on the platform and shell used in your local machine, execute the corresponding command to activate the virtual environment.

| Platform | Shell | Command to activate venv |
|----------|-------|--------------------------|
| POSIX | bash/zsh | $ source venv/bin/activate |
| | fish | $ . venv/bin/activate.fish |
| | csh/tcsh | $ source venv/bin/activate.csh |
| | PowerShell Core | $ venv/bin/Activate.ps1 |
| Windows | cmd.exe | C:\\> venv\Scripts\activate.bat |
| | PowerShell | PS C:\\> venv\Scripts\Activate.ps1 |

For e.g. on Mac, run **`source venv/bin/activate`**

Lastly, execute:

**`pip install -r requirements.txt`**

To install all app dependencies.

## Run development server

**`python manage.py runserver`**

## Unit test environment setup

Ensure you have [PostgreSQL](https://www.postgresql.org/) installed on your local machine.

Start the PostgreSQL server running in the background.

PostgreSQL default `<port number>` is **5432**. If port 5432 is not working, try port **5433**. Otherwise, you will have to find out which port your PostgreSQL server is listening on.

Then execute:

**`psql -U postgres -p <port number> -c "CREATE USER test with PASSWORD 'test';"`**

**`psql -U postgres -p <port number> -c "ALTER USER test CREATEDB;"`**

**`	psql -U postgres -p <port number> -c "CREATE DATABASE test;"`**

Note: if you are not using port 5432, you will have to open the `.env.backend.test` file and change `SQL_PORT=5432` to `SQL_PORT=<port number used>`.

## Run unit tests

**`python manage.py test`**
