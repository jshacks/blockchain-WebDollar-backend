# Node-WebDollar

# Webstorm ES6

Settings => Languages & Frameworks => JavaScript language version and choose **ECMAScript 6**

![JS Version](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2015/05/js-version.png "Javascript ECMAScript 6 config")

# Installing

1. Cloning Repository 
```
git clone https://github.com/WebDollar/Node-WebDollar.git Node-WebDollar
```
2. Installing modules 
```
npm install
```


## Testing in console
```
npm test
```

##### Missing Packages
Obs. In case there you get an error message about some missing packages like the following one:

```Error: Cannot find module 'rxjs/Observable'```

just, run ```npm install name_missing_package```

## Building Dist
```
npm run build
```

We use browserify

```
npm install -g browerfiy
browserify dist/index.js > dist_bundle/bundle.js
npm install bufferutil utf-8-validate
```

### No-IP solution for FallBack
http://www.noip.com/support/knowledgebase/installing-the-linux-dynamic-update-client-on-ubuntu/

#### Tutorial how to make NO-IP as start-up service in Linux
https://askubuntu.com/questions/903411/how-do-i-set-up-no-ip-as-a-proper-service

#### Firewall
sudo iptables -A INPUT -p tcp --dport 12320 -j ACCEPT

If you are under a **router/firewall**, you need to port forward the port used by the Nodes **12320**

