#! /bin/bash

version=`cat package.json | egrep -n  "version\":\s?\"(.*?)\""`
echo $version
