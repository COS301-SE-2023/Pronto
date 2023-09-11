#!/bin/bash

# Rollback to the previous Git commit
git reset --hard HEAD^

# Restart the application
npm start
