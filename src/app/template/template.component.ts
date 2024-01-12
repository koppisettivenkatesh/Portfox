import { Component, ElementRef, HostListener, Renderer2, ViewChild ,} from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  isEditMode = false;
  showEditButton = false;
  editableElement: HTMLElement | null = null;
  @ViewChild('editContainer', { read: ElementRef, }) editContainer!: ElementRef;

  // remove edit button when use click on body after right click

  constructor(private renderer: Renderer2) {
    document.body.addEventListener('click', () => {
      this.showEditButton = false;
      this.removeEditButton();
    })

  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    let navBar = document.getElementById('nav-bar') as HTMLElement
    let navLinks = document.getElementById('nav-links') as HTMLElement
     if (scrollY > 10) {
       navBar.classList.add('nav-white')
       navLinks.classList.add('nav-links')
    }
    if (scrollY < 10) {
      navBar.classList.remove('nav-white')
      navLinks.classList.remove('nav-links')
    }
  }

  // to set element to editable

  toggleEditMode() {
    if (this.showEditButton && this.editableElement) {
      this.isEditMode = !this.isEditMode;

      // Set the content editable attribute based on the edit mode
      this.renderer.setAttribute(this.editableElement, 'contenteditable', this.isEditMode.toString());

      if (this.isEditMode) {
        // Focus on the element in edit mode
          this.editableElement?.focus();
      }

      // Remove the "Edit" button after clicking
      this.removeEditButton();
    }
  }


  // after editing required element when user out of focus then the element set to unfocus  and content edit is false

  exitEditMode() {
    if (this.isEditMode && this.editableElement) {
      // Exit edit mode and reset the UI
      this.isEditMode = false;
      this.renderer.setAttribute(this.editableElement, 'contenteditable', 'false');
      this.showEditButton = false;
      this.removeEditButton();
    }
  }

  // Remove all child nodes from the container

  removeEditButton() {
    const container = this.editContainer.nativeElement;
    while (container.firstChild) {
      this.renderer.removeChild(container, container.firstChild);
    }
  }

  // position of the edit button and preventing right click

  showEditButtonOnRightClick(event: MouseEvent) {
    event.preventDefault();
    this.showEditButton = true;
    this.editableElement = event.target as HTMLElement;

    // Remove existing "Edit" button before creating a new one
    this.removeEditButton();

    // Create "Edit" button dynamically
    const editButton = this.renderer.createElement('button');
    editButton.classList.add('custom-edit-button');
    this.renderer.setProperty(editButton, 'innerText', 'Edit');
    this.renderer.listen(editButton, 'click', () => this.toggleEditMode());

    // Position the container below the triggered element
    const rect = this.editableElement.getBoundingClientRect();
    const containerTop = rect.bottom + window.scrollY;
    const containerLeft = rect.left + window.scrollX;

    this.renderer.setStyle(this.editContainer.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.editContainer.nativeElement, 'left', `${containerLeft}px`);
    this.renderer.setStyle(this.editContainer.nativeElement, 'top', `${containerTop + 15}px`);

    // Append the button to the container
    this.renderer.appendChild(this.editContainer.nativeElement, editButton);

    // Add blur event listener to the editable element
    this.renderer.listen(this.editableElement, 'blur', () => this.exitEditMode());
  }


  // replacing the img with current img

  showFileUploader(event: MouseEvent) {
    event.preventDefault();

    // Get the target element (in this case, the <img> tag)
    const targetElement = event.target as HTMLImageElement;

    // Create and open a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    // Listen for the file input change event
    fileInput.addEventListener('change', (fileChangeEvent: Event) => {
      const files = (fileChangeEvent.target as HTMLInputElement).files;

      if (files && files.length > 0) {
        const newImage = files[0];

        // Update the src attribute of the target image
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          targetElement.src = readerEvent.target?.result as string;
        };
        reader.readAsDataURL(newImage);
      }
    });

    // Trigger a click on the file input to open the file uploader dialog
    fileInput.click();
  }



  // getting all the require html css and img

  @ViewChild('content') content!: ElementRef;

  htmlContent: string ="";
  cssContent: string = "";

  captureHtmlAndCss() {

    this.htmlContent = this.content.nativeElement.outerHTML;

    // Capture current CSS content from the browser
    const styleSheets = document.styleSheets;
    let cssText = '';
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i] as CSSStyleSheet;
      const rules = styleSheet.cssRules;
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          cssText += rules[j].cssText + '\n';
        }
      }
    }
    this.cssContent = cssText;

  }

  //  pushing into zip to download

  downloadAsZip() {

    const addAttribute = document.getElementById('stylesheet')
    addAttribute?.setAttribute('href', 'style.css')
    const removebutton = document.getElementById('remove')
    removebutton?.remove()


    // Capture HTML and CSS content

    this.captureHtmlAndCss();
    const addScript = `
    <script>
    let menu = document.getElementById('menu');
    let open = document.getElementById('open');
    let close = document.getElementById('close');
    let navBar = document.getElementById('nav-bar');
    let navLinks = document.getElementById('nav-links')

    function openfunc() {
      close.classList.remove('show');
      open.classList.add('show');
      menu.classList.remove('show');
    }

    function closefunc() {
      close.classList.add('show');
      open.classList.remove('show');
      menu.classList.add('show');}

      window.addEventListener("scroll", function (event) {
        if (this.scrollY > 20) {
          console.log(this.scrollY)
           navBar.classList.add('nav-white')
           navLinks.classList.add('nav-links')
        }
        if (this.scrollY < 20) {
          navBar.classList.remove('nav-white')
          navLinks.classList.remove('nav-links')

        }
      });

      </script>

    `
    const addStyle = `
      @media only screen and (max-width: 856px) {
        .show{
          display : none;
        }
      }
      @media only screen and (min-width: 600px) and (max-width: 1016px) {
        .show{
          display : none;
        }
      }
      .nav-white{
        background-color: white;
        transition: ease 1s;
      }

      `
    const zip = new JSZip();

    // Add files to the zip dynamically based on the captured content
    zip.file('index.html', this.htmlContent + addScript);
    zip.file('style.css', this.cssContent + addStyle);

    // Fetch and add images referenced in the HTML
    const imageElements = this.content.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    const imagePromises = Array.from(imageElements).map((imgElement: HTMLImageElement) => {
      const imageUrl = imgElement.src;
      const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      return fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => zip.file(`assets/${imageName}`, blob))
        .catch(error => {
          console.error(error);
        });
    });

    // Wait for all image fetches to complete before generating the zip file
    Promise.all(imagePromises as Promise<void | JSZip>[])
      .then(() => {
        // Generate the zip file and trigger the download
        zip.generateAsync({ type: 'blob' })
          .then((content: Blob) => {
            saveAs(content, 'downloadedFiles.zip');
          });
      });
  }

  menuToggle: boolean = true

  onMenuToggle() {
    this.menuToggle = !this.menuToggle
  }

}
