export default function RouterMixin(superclass) {
    return class extends superclass {
        router(routes) {
            //let found = false
            //routes.map((route) => {
                
                const url = decodeURI(window.location.pathname)
                //route.pattern = document.getElementsByTagName('base')[0].getAttribute("href") + '/' + route.pattern
                
                //const patternArray = route.pattern.split('/').filter((path) => { return path != '' })
                //const urlArray = url.split('/').filter((path) => { return path != '' })
                //const query = decodeURI(window.location.search)
                //const params = {}
                //let matchStatistic = 0
                //let matchLength = false

                /*patternArray.map((pattern, i) => {
                    if (!/^:/.test(pattern)) {
                        matchStatistic++
                    }
                })*/

                /*if (patternArray.length === urlArray.length) {
                    matchLength = true
                    patternArray.map((pattern, i) => {
                        if (/^:/.test(pattern)) {
                            params[pattern.substring(1)] = urlArray[i]
                        } else {
                            if (pattern === urlArray[i]) {
                                matchStatistic--
                            }
                        }
                    })
                }*/

                // Jockes egan lilla router
                //console.log("ROUTER says: " + url.split('/').filter((path) =>{return path != ''} ))
                let myUrlArray = url.split('/').filter((path) =>{return path != ''});
                //console.log("ROUTER says: urlArray " + myUrlArray.length )
                if(myUrlArray.length > 0) {
                    this.set('state.currentRoute', myUrlArray[0])
                    this.set('state.viewPage', myUrlArray[0])
                } else {
                    this.set('state.currentRoute', route.name)
                    this.set('state.viewPage', route.name)
                }
                //console.log(this.get('state.currentRoute'))


           // })

                //console.log(this.get('state.currentRoute'));
           // )

        }
    };
}