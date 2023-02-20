import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../service/modal.service';

@Component({
    selector: 'wb-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    isOpen = false;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        // add self (this modal instance) to the modal service so it can be opened from any component
        this.modalService.add(this);

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: any) => {
            if (el.target.className === 'wb-modal') {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        // remove self from modal service
        this.modalService.remove(this);

        // remove modal element from html
        this.element.remove();
    }

    open() {
        this.element.style.visibility = 'visible';
        this.element.style.opacity = '1';
        document.body.classList.add('wb-modal-open');
        this.isOpen = true;
    }

    close() {
        this.element.style.visibility = 'hidden';
        this.element.style.opacity = '0';
        document.body.classList.remove('wb-modal-open');
        this.isOpen = false;
    }
}
