const moment=require('moment')

module.exports ={

    formatDate: (date, format)=>{
        return moment(date).utc().format(format)
    },
    truncate: (str,len)=>{ // reduces the length of words
        if(str.length > len && str.length >0) {
            let new_str= str+' ' 
            new_str= str.substr(0,len)
            new_str= str.substr(0,new_str.lastIndexOf(' '))
            new_str= str.length >0 ? new_str :str.substr(0,len)
            return new_str + '...'
            
        } return str
    },
    stripTags: (input)=>{ // removes all html elemets being dsiplayed on the page
        return input.replace(/<(?:.|\n)*?>/gm, '')
    }, 
    editIcon : (storyUser,loggedUser,storyId,floating=true)=>{
        if(storyUser._id.toString()== loggedUser._id.toString()){
            if(floating){
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
        }
        else{
return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a> `
        }}  
        else{
            return ""
        }

    },
 select: (selected,options) => {
     return options 
     .fn(this)
     .replace(new RegExp('value=" ' +selected + '" '), '$& selected= "selected" ')
     .replace(new RegExp('>' + selected + '</option'),
     'selected="selected"$&')
 }  
}