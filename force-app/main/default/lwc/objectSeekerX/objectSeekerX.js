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
    @api removedObjectsNames;

    @wire(getAllObjectsNames) wiredObjectsNames({data, error}) {
        if (data) {
            let preparedData = [];
            data.forEach(element => {
                preparedData.push({ 'label' : element.label, 'name' : element.name });
            });
            this.allObjectsFromApex = preparedData;
        }
        if (error) {
            this.value = 'Error ' + error;
        }
    }

    removeElements() {
        if (this.removedObjectsNames) {
            this.removedObjectsNames.forEach((elemToDelete) => {
                this.allObjectsFromApex.forEach((elemExist, index) => {
                    if (elemToDelete.toLowerCase() === elemExist.name.toLowerCase()) {
                        this.allObjectsFromApex.splice(index, 1);
                    }
                });
            });
        }
    }

    enterKey(evtent) {
        this.removeElements();
        let _searchResults = [];
        this.queryTerm = evtent.target.value;
        this.queryTermWithQuotes = '"' + this.queryTerm + '"';
        let size = this.queryTerm.length;
        this.allObjectsFromApex.forEach((elem) => {
            if (elem.label.length >= size) {
                if (this.queryTerm.toLowerCase() === elem.label.slice(0, size).toLowerCase()) {
                    _searchResults.push(elem);
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