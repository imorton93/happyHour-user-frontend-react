import { SetStateAction } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";


function SearchBar({ searchQuery, setSearchQuery }: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<SetStateAction<string>>;
}){


    return (
        <Form.Group controlId="searchKeyword">
            <InputGroup className="search-bar">
                <InputGroup.Text>
                <BiSearch size={20} />
                </InputGroup.Text>
                <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </InputGroup>
        </Form.Group>
    )
};

export default SearchBar;