# Object SeekerX LWC Component

You can seek any object on your organization and choose it  
Component limited by profile  
Also you can pass on object name, that won't availible in picklist  
When you make choose, this component sends an event with object API name to  
the parent component  

EXAMPLE 1:

<c-object-seeker-x onsetobjectname={setObjectNameFirst}></c-object-seeker-x>

setObjectNameFirst(event) {
    let objectName = event.detail;
}
 
EXAMPLE 2:

<c-object-seeker-x removed-object-name={removedObjectName}
    onsetobjectname={setObjectNameFirst}
    >
</c-object-seeker-x>

@track removedObjectName = 'Contact';

setObjectNameFirst(event) {
    let objectName = event.detail;
}


## Designed by via.shcherba
16/03/2020

