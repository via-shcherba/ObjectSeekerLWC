import { LightningElement, track, wire, api } from 'lwc';
import getAllObjectsNames from '@salesforce/apex/objectSeekerApexController.getAllObjectsNames';

export default class ObjectSeekerX extends LightningElement {
    @track searchResults;
    @track queryTerm;
    @track queryTermWithQuotes;
    @track allObjectsFromApex;
    @track isDisabled;
    @track value;
    @track apiObjectName;
    @api removedObjectName;

    @wire(getAllObjectsNames) wiredObjectsNames({data, error}) {
        if (data) {
            this.allObjectsFromApex = data;
        }
        if (error) {
            this.value = 'Conncetion error with Apex!';
        }
    }

    enterKey(evtent) {
        let _searchResults = [];
        this.queryTerm = evtent.target.value;
        this.queryTermWithQuotes = '"' + this.queryTerm + '"';
        let size = this.queryTerm.length;
        this.allObjectsFromApex.forEach((elem, index) => {
            if (elem.label.length >= size) {
                if (this.removedObjectName) {
                    if (this.queryTerm.toLowerCase() === elem.label.slice(0, size).toLowerCase()
                        && this.removedObjectName.toLowerCase() !== elem.name.toLowerCase()) {
                        _searchResults.push({'label' : elem.label, 'name' : elem.name});
                    }
                } else {
                    if (this.queryTerm.toLowerCase() === elem.label.slice(0, size).toLowerCase()) {
                        _searchResults.push({'label' : elem.label, 'name' : elem.name});
                    }
                }
            }
        });
        this.searchResults = _searchResults;
    }

    setSelectedRecord(event) {
        let name = event.currentTarget.dataset.name;
        this.apiObjectName = name;
        this.sendObjectName(name);
        this.queryTerm = false;
        this.isDisabled = true;
        this.value = false;
    }

    removePill() {
        this.apiObjectName = false;
        this.sendObjectName(false);
        this.isDisabled = false;
        this.value = true;
    }

    sendObjectName(name) {
        this.dispatchEvent(
            new CustomEvent('setobjectname', { detail: name })
        );
    }

}