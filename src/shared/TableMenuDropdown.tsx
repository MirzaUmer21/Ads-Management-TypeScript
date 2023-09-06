import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import swal from 'sweetalert';
type CustomToggleProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

const CustomToggle = React.forwardRef(
  (
    { children, onClick }: CustomToggleProps,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      href='/#'
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  )
);

export default function TableMenuDropdown({
  hasEditOption,
  editOnClick,
  deleteHandler,
  hasDelete
}: DropdownProps) {
  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      iconHtml: '<i class=`fas fa-exclamation-circle` ></i>',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    } as any).then(willDelete => {
      if (willDelete) {
        deleteHandler?.();
      }
    });
  };
  return (
    <>
      <Dropdown style={{ float: 'right' }}>
        <Dropdown.Toggle as={CustomToggle}>
          <i className='fa-solid fa-ellipsis-vertical'></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {hasEditOption && (
            <Dropdown.Item onClick={editOnClick} eventKey='2'>
              Edit
            </Dropdown.Item>
          )}
          {hasDelete && (
            <Dropdown.Item onClick={() => handleDelete()} eventKey='3'>
              Trash
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

interface DropdownProps {
  hasEditOption: boolean;
  editOnClick?: () => void;
  deleteHandler?: () => void;
  hasDelete?: boolean;
}
