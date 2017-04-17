#!/bin/sh

# doesn't  work using as a var sadly, will reinvestigate later...
# glob=find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ | grep -v __tests__ | grep -v vendor | grep -v __mocks__


echo "running create-element-to-jsx"
jscodeshift -t ./react-codemod/transforms/create-element-to-jsx.js src/js/components/**/*.{js,jsx}

echo

echo "running findDOMNode"
jscodeshift -t ./react-codemod/transforms/findDOMNode.js src/js/components/**/*.{js,jsx}

echo

echo "running react-to-react-dom"
jscodeshift -t ./react-codemod/transforms/react-to-react-dom.js src/js/components/**/*.{js,jsx}

echo

echo "running sort-comp"
jscodeshift -t ./react-codemod/transforms/sort-comp.js src/js/components/**/*.{js,jsx}

echo

echo "running pure-component"
jscodeshift -t ./react-codemod/transforms/pure-component.js src/js/components/**/*.{js,jsx}

echo

echo "dry running class"
jscodeshift -d -t ./react-codemod/transforms/class.js src/js/components/**/*.{js,jsx}

echo

echo "running arrow-function"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ | grep -v __tests__ | grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -t ./js-codemod/transforms/arrow-function.js
# jscodeshift -t ../js-codemod/transforms/arrow-function.js src/js/**/^([__tests__|__mocks__|vendor])/*.{js,jsx}

echo

echo "running no-vars"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ | grep -v __tests__ | grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -t ./js-codemod/transforms/no-vars.js
# jscodeshift -t ../js-codemod/transforms/no-vars.js src/js/**/^([__tests__|__mocks__|vendor])*/*.{js,jsx}

echo

echo "running object-shorthand"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ | grep -v __tests__ | grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -t ./js-codemod/transforms/object-shorthand.js
# jscodeshift -t ../js-codemod/transforms/object-shorthand.js src/js/**/^([__tests__|__mocks__|vendor])*/*.{js,jsx}

echo

echo "dry running requiresToImports"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ | grep -v __tests__ | grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -dt scripts/requiresToImports.js
# jscodeshift -dt scripts/requiresToImports.js src/js/**/^([__tests__|__mocks__|vendor])*/*.{js,jsx}

echo

echo "running arrowFn"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ | grep -v __tests__ | grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -t scripts/arrowFn.js

echo
echo "jest-update"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ |  grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -t ./js-codemod/transforms/jest-update.js

echo
echo "jest-update-11"
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v __mocks__ |  grep -v vendor | grep -v __mocks__ | sort -u | xargs jscodeshift -t ./js-codemod/transforms/jest-11-update.js

echo
echo 'template-lterals'
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v vendor | sort -u | xargs jscodeshift -t ./js-codemod/transforms/template-literals.js
find ./src/js/**/* -type f \( -name "*.js" -o -name "*.jsx" \) | grep -v vendor | sort -u | xargs jscodeshift -t ./js-codemod/transforms/rm-requies.js

