let SassLoaded = false;
let loadingSass = true;


//////// SCRIPT LOADER FOR BROWSER  ///////////

/// JS DEVS - would be great if someone added non-browser support via import etc... 

if(typeof document !== 'undefined') {

    document.addEventListener('DOMContentLoaded', () => {
      if(typeof Sass === 'undefined') {
  
        // load SASS / SCSS compiler for browser! ie - SASS.js
          const event = loadSASSforBrowser()
  .then(() => { SassLoaded= true, loadingSass = false })
  .catch((error) => {SassLoaded = false, loadingSass = false });
    
        
      }
    })
}
                              
    function loadSASSforBrowser(){
   return new Promise(function (res, rej) {
    let script = document.createElement('script');
    script.src = "https://sass.js.org/js/sass.js/sass.sync.js";
    script.type = 'text/javascript';
    script.onError = rej;
    script.async = true;
    script.onload = res;
    script.addEventListener('error',rej);
    script.addEventListener('load',res);
    document.head.appendChild(script);
 })


    
      
 }    
      


//////// END OF SCRIPT LOADER FOR BROWSER  ///////////







   
// SASS / CSS to CSS - core function  ///   

 export function Sass_To_CSS(sass_value, compiler_type){
  
  
  
  const SASS_To_CSS_Compiler = (sass_value, compiler_type) => {
  return new Promise((resolve, reject) => {
    
    if(compiler_type != "scss"){
        Sass.compile(sass_value, {
  // Compile as SASS
  indentedSyntax:true,
}, (prep) => {
      resolve(prep)
    })
    } else{
    // Compile string as SCSS 
            Sass.compile(sass_value, (prep) => {
      resolve(prep)
    })
      
    }
    
  
  })
}

  
  
  async function corefunction(sass_value, scss_or_sass) {
  try {
    
        
         // Indicate only used for the browser! 
      if(typeof document == 'undefined') {
            throw "This library is currently only supported for usage in the browser."
          
      }
      
      
     // SCSS / SASS (Sass.js) compiler still loading - throw error 
    if( loadingSass == true){
        throw "Please wait - Sass / SCSS compiler is still loading!"
    }
    
    
       // Sass.js failed to load :(
  if( SassLoaded != true ){
      throw "SASS / SCSS (SASS.js) compiler failed to load!"
   }
    
    // no text / SASS was provided..
    if(!sass_value){
      throw "SASS value was not provided.. "
    }
    
    // the SASS.js compiler
  let sass_compiler = await SASS_To_CSS_Compiler(sass_value, compiler_type);
    
    
    /// An error occured with Sass Value! 
    if(sass_compiler.message){
       throw `SASS Error: ${sass_compiler.message}`
    }
    
    // things went smoothly! :D 
   return sass_compiler.text;
    
    } catch (error) {
      // things did NOT go smoothly! :( 
     return error
    }
    
  }
    
  return await corefunction(sass_value)
}
