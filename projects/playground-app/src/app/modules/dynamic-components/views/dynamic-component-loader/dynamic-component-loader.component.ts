import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { DynamicComponentOneComponent } from '../../components/dynamic-component-one/dynamic-component-one.component';
import { DynamicComponentTwoComponent } from '../../components/dynamic-component-two/dynamic-component-two.component';


@Component({
  selector: 'app-dynamic-component-loader',
  templateUrl: './dynamic-component-loader.component.html',
  styleUrl: './dynamic-component-loader.component.scss'
})
export class DynamicComponentLoaderComponent implements AfterViewInit {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer!: ViewContainerRef;
  DynamicComponentsEnum = DynamicComponentsEnum;
  constructor() {}

  ngAfterViewInit() {
  }

  loadComponent(componentEnum: DynamicComponentsEnum) {
    this.dynamicContainer.clear();

    const component = componentEnum === DynamicComponentsEnum.DynamicComponentOneComponent
      ? DynamicComponentOneComponent
      : DynamicComponentTwoComponent;

    this.dynamicContainer.createComponent(component);
  }
}

enum DynamicComponentsEnum {
  DynamicComponentOneComponent,
  DynamicComponentTwoComponent
}
