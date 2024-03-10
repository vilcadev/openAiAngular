
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [ RouterModule],
  template: `
    <a
      [routerLink]="path"
      routerLinkActive="bg-gray-800"
      class="flex  items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
    >
      <i class=" {{ icon }}"></i>
      <div class="flex flex-col flex-grow">
        <span class="text-white text-lg font-semibold">{{ title }}</span>
        <span class="text-gray-400 trext-sm">{{ description }}</span>
      </div>
    </a>
  `,
  styles:`
  i{
    font-size: 1.5rem;
    line-height: 2rem;
    --tw-text-opacity: 1;
    color: rgb(129 140 248 / var(--tw-text-opacity));
    margin-right: 1rem;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;
}
