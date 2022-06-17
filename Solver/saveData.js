const fs = require('fs');

export const saveData = (data, file) =>{
    // Prettier: Ctrl + Shift + P, prettify JSON
    const jsonData = JSON.stringify(data);
    const finished = (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Data saved!");
        }
    }    
    fs.writeFile(file,jsonData, finished)
}
