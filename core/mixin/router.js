export default function RouterMixin(superclass) {
    return class extends superclass {
        
        router(routes) {
            //console.log("router.js");    
            const url = decodeURI(window.location.pathname)
            let myUrlArray = url.split('/').filter((path) =>{return path != ''});
            //console.log(url);
            if(myUrlArray.length > 0) {
                this.set('state.currentRoute', myUrlArray[0])
                this.set('state.viewPage', myUrlArray[0])
            } else {
                this.set('state.currentRoute', route.name)
                this.set('state.viewPage', route.name)
            }
        }
        
    };
}