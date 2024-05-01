
import {Modal} from "semantic-ui-react";


function EventForm() {

  return (
    <Modal open={true} >
        <Modal.Header>
          Vytvořit událost
        </Modal.Header>
        <Modal.Content style={{ position: "relative" }}>
        </Modal.Content>
    </Modal>
  );
}

export default EventForm;
