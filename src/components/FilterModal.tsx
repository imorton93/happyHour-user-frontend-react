import { Modal } from "react-bootstrap";


function FilterModal({filterView, setFilterView}: {filterView: boolean; setFilterView: React.Dispatch<React.SetStateAction<boolean>>}){

    


    return(
        <Modal show={filterView} onHide={() => setFilterView(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Modal</Modal.Title>
                </Modal.Header>
                
                
        </Modal>
        
    )
}

export default FilterModal;