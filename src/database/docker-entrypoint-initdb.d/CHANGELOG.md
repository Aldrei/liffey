# Change log

- Rename tables with compound names to plural:
  -  E.g: employee_email to employees_emails - Note: It's not valid to pivot tables.

- Date values '0000-00-00' to null.

- Remove tables oauth_*

- Don't migrate data from migrations table(just create the table).