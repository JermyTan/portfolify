#!/bin/sh

# collect current env variables and create env-variables.yml from env-variables-template.yml

rm -f temp.yml env-variables.yml
( echo "cat <<EOF>env-variables.yml";
  cat env-variables-template.yml;
  echo "EOF";
) >temp.yml
chmod +x temp.yml
./temp.yml
rm -f temp.yml
