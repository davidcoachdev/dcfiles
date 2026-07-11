# shadcn/ui Core Components Reference

## Table of Contents

1. [Button](#1-button)
2. [Card](#2-card)
3. [Dialog](#3-dialog)
4. [Input](#4-input)
5. [Select](#5-select)
6. [Tabs](#6-tabs)
7. [Avatar](#7-avatar)
8. [Badge](#8-badge)
9. [Dropdown Menu](#9-dropdown-menu)
10. [Alert](#10-alert)
11. [Progress](#11-progress)
12. [Separator](#12-separator)
13. [Scroll Area](#13-scroll-area)
14. [Skeleton](#14-skeleton)
15. [Table](#15-table)
16. [Accordion](#16-accordion)
17. [Checkbox](#17-checkbox)
18. [Switch](#18-switch)
19. [Textarea](#19-textarea)
20. [Tooltip](#20-tooltip)
21. [Popover](#21-popover)
22. [Sheet](#22-sheet)
23. [Alert Dialog](#23-alert-dialog)

---

## 1. Button

**Install:** `npx shadcn@latest add button`

**Import:**
```tsx
import { Button } from '@/components/ui/button'
```

**Variants:**
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

**Sizes:**
```tsx
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon (square)</Button>
<Button size="icon-xs">Icon XS</Button>
<Button size="icon-sm">Icon SM</Button>
<Button size="icon-lg">Icon LG</Button>
```

**With Icon:**
```tsx
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

**Loading State (Spinner):**
```tsx
<Button>
  <Spinner data-icon="inline-start" />
  Loading
</Button>
```

**As Child:**
```tsx
<Button asChild>
  <Link href="/login">Login</Link>
</Button>
```

---

## 2. Card

**Install:** `npx shadcn@latest add card`

**Import:**
```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
```

**Composition Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

**Size variants:** `size="default"` | `size="sm"`

---

## 3. Dialog

**Install:** `npx shadcn@latest add dialog`

**Import:**
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
```

**Composition Structure:**
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

**Options:** `showCloseButton={false}` | `className="..."`

---

## 4. Input

**Install:** `npx shadcn@latest add input`

**Import:**
```tsx
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field'
```

**Basic:**
```tsx
<Input placeholder="Enter text..." />
```

**With Field (Label + Description):**
```tsx
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" placeholder="tu@email.com" />
  <FieldDescription>Enter your email address</FieldDescription>
</Field>
```

**Field Group (Form Layout):**
```tsx
<FieldGroup>
  <Field>
    <FieldLabel>First Name</FieldLabel>
    <Input placeholder="John" />
  </Field>
  <Field>
    <FieldLabel>Last Name</FieldLabel>
    <Input placeholder="Doe" />
  </Field>
</FieldGroup>
```

**Invalid State:**
```tsx
<Field data-invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid />
  <FieldError>Invalid email address</FieldError>
</Field>
```

**File Input:**
```tsx
<Field>
  <FieldLabel htmlFor="picture">Picture</FieldLabel>
  <Input id="picture" type="file" />
</Field>
```

---

## 5. Select

**Install:** `npx shadcn@latest add select`

**Import:**
```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
```

**Composition Structure:**
```tsx
<Select onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Group Label</SelectLabel>
      <SelectItem value="1">Option 1</SelectItem>
      <SelectItem value="2">Option 2</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

**Groups:**
```tsx
<SelectContent>
  <SelectGroup>
    <SelectLabel>Fruits</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Vegetables</SelectLabel>
    <SelectItem value="carrot">Carrot</SelectItem>
  </SelectGroup>
</SelectContent>
```

**Invalid State:**
```tsx
<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <SelectTrigger aria-invalid>
    <SelectValue />
  </SelectTrigger>
</Field>
```

---

## 6. Tabs

**Install:** `npx shadcn@latest add tabs`

**Import:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
```

**Composition Structure:**
```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>
```

**Vertical:**
```tsx
<Tabs orientation="vertical">
  ...
</Tabs>
```

**With Icons:**
```tsx
<TabsList>
  <TabsTrigger value="preview">
    <EyeIcon data-icon="inline-start" />
    Preview
  </TabsTrigger>
</TabsList>
```

**Line Variant:**
```tsx
<TabsList variant="line">
  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
</TabsList>
```

---

## 7. Avatar

**Install:** `npx shadcn@latest add avatar`

**Import:**
```tsx
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar'
```

**Basic:**
```tsx
<Avatar>
  <AvatarImage src={user.avatar} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**With Badge:**
```tsx
<Avatar>
  <AvatarImage src={user.avatar} />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-green-600" />
</Avatar>
```

**Avatar Group:**
```tsx
<AvatarGroup>
  <Avatar><AvatarImage src="/1" /><AvatarFallback>CN</AvatarFallback></Avatar>
  <Avatar><AvatarImage src="/2" /><AvatarFallback>ER</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>
```

**Sizes:** `size="sm"` | `size="default"` | `size="lg"`

---

## 8. Badge

**Install:** `npx shadcn@latest add badge`

**Import:**
```tsx
import { Badge } from '@/components/ui/badge'
```

**Variants:**
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="link">Link</Badge>
```

**With Icon:**
```tsx
<Badge>
  <CheckIcon data-icon="inline-start" />
  Verified
</Badge>
```

**Custom Colors:**
```tsx
<Badge className="bg-blue-100 text-blue-700">Custom</Badge>
```

---

## 9. Dropdown Menu

**Install:** `npx shadcn@latest add dropdown-menu`

**Import:**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
```

**Composition Structure:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**With Icons:**
```tsx
<DropdownMenuItem>
  <LogOutIcon data-icon="inline-start" />
  Log out
</DropdownMenuItem>
```

**Checkbox Items:**
```tsx
<DropdownMenuCheckboxItem checked={showNotifications}>
  Notifications
</DropdownMenuCheckboxItem>
```

**Radio Items:**
```tsx
<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>
```

**Destructive:**
```tsx
<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
```

**Submenu:**
```tsx
<DropdownMenuSub>
  <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Sub item</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>
```

---

## 10. Alert

**Install:** `npx shadcn@latest add alert`

**Import:**
```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
```

**Usage:**
```tsx
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>
```

**Variants:** `variant="default"` | `variant="destructive"`

---

## 11. Progress

**Install:** `npx shadcn@latest add progress`

**Import:**
```tsx
import { Progress } from '@/components/ui/progress'
```

**Usage:**
```tsx
<Progress value={33} />
```

---

## 12. Separator

**Install:** `npx shadcn@latest add separator`

**Import:**
```tsx
import { Separator } from '@/components/ui/separator'
```

**Usage:**
```tsx
<Separator />
<Separator orientation="vertical" />
```

---

## 13. Scroll Area

**Install:** `npx shadcn@latest add scroll-area`

**Import:**
```tsx
import { ScrollArea } from '@/components/ui/scroll-area'
```

**Usage:**
```tsx
<ScrollArea className="h-[200px]">
  <div>Content...</div>
</ScrollArea>
```

---

## 14. Skeleton

**Install:** `npx shadcn@latest add skeleton`

**Import:**
```tsx
import { Skeleton } from '@/components/ui/skeleton'
```

**Usage:**
```tsx
<Skeleton className="w-[100px] h-[20px]" />
```

---

## 15. Table

**Install:** `npx shadcn@latest add table`

**Import:**
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
```

**Usage:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 16. Accordion

**Install:** `npx shadcn@latest add accordion`

**Import:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
```

**Usage:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 17. Checkbox

**Install:** `npx shadcn@latest add checkbox`

**Import:**
```tsx
import { Checkbox } from '@/components/ui/checkbox'
```

**Usage:**
```tsx
<Checkbox id="terms" />
```

**With Label:**
```tsx
<Field>
  <Checkbox id="terms" />
  <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
</Field>
```

---

## 18. Switch

**Install:** `npx shadcn@latest add switch`

**Import:**
```tsx
import { Switch } from '@/components/ui/switch'
```

**Usage:**
```tsx
<Switch id="airplane-mode" />
```

**With Label:**
```tsx
<Field>
  <div className="flex items-center gap-2">
    <Switch id="airplane-mode" />
    <FieldLabel htmlFor="airplane-mode">Airplane mode</FieldLabel>
  </div>
</Field>
```

---

## 19. Textarea

**Install:** `npx shadcn@latest add textarea`

**Import:**
```tsx
import { Textarea } from '@/components/ui/textarea'
```

**Usage:**
```tsx
<Textarea placeholder="Type your message here." />
```

**With Field:**
```tsx
<Field>
  <FieldLabel htmlFor="message">Message</FieldLabel>
  <Textarea id="message" placeholder="Type your message here." />
</Field>
```

---

## 20. Tooltip

**Install:** `npx shadcn@latest add tooltip`

**Import:**
```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
```

**Usage:**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## 21. Popover

**Install:** `npx shadcn@latest add popover`

**Import:**
```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
```

**Usage:**
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px]">
    <p>Add content here</p>
  </PopoverContent>
</Popover>
```

---

## 22. Sheet

**Install:** `npx shadcn@latest add sheet`

**Import:**
```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
```

**Usage:**
```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

**Positions:** `sheetContent.side="top|right|bottom|left"`

---

## 23. Alert Dialog

**Install:** `npx shadcn@latest add alert-dialog`

**Import:**
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
```

**Usage:**
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## All Components List (62 total)

| Component | Install Command |
|-----------|----------------|
| Accordion | `npx shadcn@latest add accordion` |
| Alert | `npx shadcn@latest add alert` |
| Alert Dialog | `npx shadcn@latest add alert-dialog` |
| Aspect Ratio | `npx shadcn@latest add aspect-ratio` |
| Avatar | `npx shadcn@latest add avatar` |
| Badge | `npx shadcn@latest add badge` |
| Breadcrumb | `npx shadcn@latest add breadcrumb` |
| Button | `npx shadcn@latest add button` |
| Button Group | `npx shadcn@latest add button-group` |
| Calendar | `npx shadcn@latest add calendar` |
| Card | `npx shadcn@latest add card` |
| Carousel | `npx shadcn@latest add carousel` |
| Chart | `npx shadcn@latest add chart` |
| Checkbox | `npx shadcn@latest add checkbox` |
| Collapsible | `npx shadcn@latest add collapsible` |
| Combobox | `npx shadcn@latest add combobox` |
| Command | `npx shadcn@latest add command` |
| Context Menu | `npx shadcn@latest add context-menu` |
| Data Table | `npx shadcn@latest add data-table` |
| Date Picker | `npx shadcn@latest add date-picker` |
| Dialog | `npx shadcn@latest add dialog` |
| Direction | `npx shadcn@latest add direction` |
| Drawer | `npx shadcn@latest add drawer` |
| Dropdown Menu | `npx shadcn@latest add dropdown-menu` |
| Empty | `npx shadcn@latest add empty` |
| Field | `npx shadcn@latest add field` |
| Hover Card | `npx shadcn@latest add hover-card` |
| Input | `npx shadcn@latest add input` |
| Input Group | `npx shadcn@latest add input-group` |
| Input OTP | `npx shadcn@latest add input-otp` |
| Kbd | `npx shadcn@latest add kbd` |
| Label | `npx shadcn@latest add label` |
| Menubar | `npx shadcn@latest add menubar` |
| Native Select | `npx shadcn@latest add native-select` |
| Navigation Menu | `npx shadcn@latest add navigation-menu` |
| Pagination | `npx shadcn@latest add pagination` |
| Popover | `npx shadcn@latest add popover` |
| Progress | `npx shadcn@latest add progress` |
| Radio Group | `npx shadcn@latest add radio-group` |
| Resizable | `npx shadcn@latest add resizable` |
| Scroll Area | `npx shadcn@latest add scroll-area` |
| Select | `npx shadcn@latest add select` |
| Separator | `npx shadcn@latest add separator` |
| Sheet | `npx shadcn@latest add sheet` |
| Sidebar | `npx shadcn@latest add sidebar` |
| Skeleton | `npx shadcn@latest add skeleton` |
| Slider | `npx shadcn@latest add slider` |
| Sonner (Toast) | `npx shadcn@latest add sonner` |
| Spinner | `npx shadcn@latest add spinner` |
| Switch | `npx shadcn@latest add switch` |
| Table | `npx shadcn@latest add table` |
| Tabs | `npx shadcn@latest add tabs` |
| Textarea | `npx shadcn@latest add textarea` |
| Toast | `npx shadcn@latest add toast` |
| Toggle | `npx shadcn@latest add toggle` |
| Toggle Group | `npx shadcn@latest add toggle-group` |
| Tooltip | `npx shadcn@latest add tooltip` |
| Typography | `npx shadcn@latest add typography` |

---

## Reference URLs

- **Components Docs**: https://ui.shadcn.com/docs/components
- **CLI Docs**: https://ui.shadcn.com/docs/cli
- **GitHub**: https://github.com/shadcn-ui/ui