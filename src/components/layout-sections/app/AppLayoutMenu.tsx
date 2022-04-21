import { Button } from '../../common/button';
import { Form, FormGroup } from '../../common/form';
import { InputCheckbox } from '../../common/input';

export interface AppLayoutMenuAttributes {
  isOpen?: boolean;
  close?: () => void;
}

export default function AppLayoutMenu() {
  const tags = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ];

  return (
    <div className="fixed h-full inset-0 pt-[calc(60px+2.5rem)] w-full z-[98]">
      <div className="absolute bg-white inset-0"></div>
      <div className="px-4 py-10 mx-auto relative w-full md:px-8 md:w-4/6">
        {/* Search */}
        {/* My Posts or Search Author */} {/* Category */} {/* Tags */}
        {/* Filter By Date */} {/* Filter By Rating */}{' '}
        {/* Filter By My Like */}
        {/* Sort */}
        <Form className="grid gap-8 ">
          <div className="grid grid-cols-2 gap-8">
            <FormGroup label="Search" />
            <FormGroup label="Author" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormGroup label="Select Category" />
            <FormGroup type="tags" label="Select Tags" suggestions={tags} />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FormGroup label="Filter By Date" />
            <FormGroup label="Filter By Rating" />
            <FormGroup label="Liked By Me" />
          </div>
          <div>
            <FormGroup label="Enter Sorting Preference" />
          </div>
          <div className='flex gap-8 items-center'>
            <Button colorScheme="blue" size="md" className='flex-grow'>
              Fetch Posts
            </Button>
            <div>
              <InputCheckbox label='Remember configuration?' id='remember' />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
