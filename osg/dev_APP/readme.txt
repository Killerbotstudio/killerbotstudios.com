Process sheet to create API with django
#bot7913wws66

$mkdir "create project folder"
$cd "go to project folder"
$pipenv install Django --> creates virtualenviroment inside "FOLDER" and installs Django
/Users/mac/.virtualenvs/dev_APP-y6TUCzuV
$pipenv shell --> run this to activate enviroment


### Django
cmd "$ $django-admin startproject 'nameofproject' ." --> period is added to avoid duplicates


### SERVER
cmd $ python manage.py runserver '0000'
- Set default interpreter path for settings.json



edit: settings.py
@INSTALLED_APPS
.admin : admin interface
.sessions : temporary cache for users data
cmd $ python manage.py 'name of app' --> CREATES AN APP
add app list

#### VIEWS
#request handler
