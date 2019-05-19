export class Assert {

    // use asserts to check and document boundary conditions, and stuff that
    // TypeScript's types won't find.

    // Asserts document that you designed your code so that some condition is
    // always (meant to) be true at that time, taking into account the interactions
    // between components.

    // let assert = new Assert();
    // assert.true(true, new Error('Test Passes'));
    // assert.true(false, new Error('Test Fails'));

    public true(outcome: Boolean, description: Error): void {
        if (!outcome) {
            // outdiv and output might be null
            const assertdiv = document.getElementById("assertdiv");
            const output = document.getElementById('output');

            if (assertdiv && output) {  // either HTMLElement or null
                assertdiv.style.display = "block";
                assertdiv.style.backgroundColor = "yellow";
                var li = document.createElement('li');
                li.innerHTML = "<span style='color:red;font-weight:bold;'>FAIL</span> " +
                    description;

                output.appendChild(li);
            }
            // we also print to the console in error colours so we can get the line number
            // hide the display warnings in production by removing the <div>, will still get console errors
            console.log('%c' + description, 'background: yellow; color: red')
        }
    };

}
