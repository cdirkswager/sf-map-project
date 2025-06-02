import { LightningElement, api, wire } from 'lwc';
import IMAGE_URL_FIELD from '@salesforce/schema/MapImage__c.ImageURL__c';
import { getRecord } from 'lightning/uiRecordApi';

export default class MapViewer extends LightningElement {
    @api recordId;
    imageUrl;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: [IMAGE_URL_FIELD] })
    wiredMapImage({ error, data }) {
        if (data) {
            this.imageUrl = data.fields.ImageURL__c.value;
            this.error = undefined;
        } else if (error) {
            this.error = 'Failed to load image from record.';
            this.imageUrl = undefined;
        }
    }

    handleImageError() {
        this.error = 'Image failed to load. Check the URL or permissions.';
        this.imageUrl = undefined;
    }
}
