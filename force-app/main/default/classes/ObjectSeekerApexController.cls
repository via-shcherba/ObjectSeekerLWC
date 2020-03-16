public with sharing class ObjectSeekerApexController {
    
    @AuraEnabled(cacheable=true)
    public static List<Wrapper> getAllObjectsNames() {
        List<Wrapper> allObjectsNames = new List<Wrapper>();
        Map<String, Schema.SObjectType> objects = Schema.getGlobalDescribe();
        for(Schema.SObjectType obj : objects.values()) {
            Schema.DescribeSObjectResult describe = obj.getDescribe();
            if(describe.isUpdateable()) {
                allObjectsNames.add(new Wrapper(String.valueOf(obj), describe.getLabel()));
            }
        }
        return allObjectsNames;
    }

    public class Wrapper {

        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public String label {get; set;}

        public Wrapper(String name, String label) {
            this.name = name;
            this.label = label;
        }
    }
}
