import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table>
      <thead>
        <tr>
          <th >No</th>
          <th >Title</th>
          <th >
            Author
          </th>
          <th >
            Publish Year
          </th>
          <th >
            Comments
          </th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td >
              {index + 1}
            </td>
            <td>
              {book.title}
            </td>
            <td >
              {book.author}
            </td>
            <td>
              {book.publishYear}
            </td>
            <td >
              {book.Comments}
            </td>
            <td >
              <div >
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle  />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit  />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete  />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
