import PropTypes from 'prop-types';
import {Button, Grid, Icon, Modal} from 'semantic-ui-react';
import { usePopup } from '../../lib/popup';

import Label from "../Label";
import NameField from "./NameField";
import DueDateEditStep from '../DueDateEditStep';
import CardMoveStep from '../CardMoveStep';
import DeleteStep from '../DeleteStep';
import LabelsStep from "../LabelsStep";

import styles from './CardModal.module.css';
import DescriptionEdit from "./DescriptionEdit";
import {Markdown} from "../../lib/custom-ui";
import classNames from "classnames";


function CardModal({
    name,
    labels,
    dueDate
  }) {

    const LabelsPopup = usePopup(LabelsStep);
    const DueDateEditPopup = usePopup(DueDateEditStep);
    const CardMovePopup = usePopup(CardMoveStep);
    const DeletePopup = usePopup(DeleteStep);

    const labelIds = labels.map((label) => label.id);

    const contentNode = (
        <Grid className={styles.grid}>
            <Grid.Row className={styles.headerPadding}>
                <Grid.Column width={14} className={styles.headerPadding}>
                    <div className={styles.headerWrapper}>
                        <Icon name="list alternate outline" className={styles.moduleIcon}/>
                        <div className={styles.headerTitleWrapper}>
                            <NameField defaultValue={name} />
                        </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className={styles.modalPadding}>
                <Grid.Column width={10} className={styles.contentPadding}>
                    <div className={styles.moduleWrapper}>
                        <div className={styles.attachments}>
                            <div className={styles.text}>Priority</div>
                            {labels.map((label) => (
                                <span key={label.id} className={styles.attachment}>
                                    <Label size="medium" name={label.name} color={label.color}/>
                                </span>))}
                        </div>
                        <div className={styles.attachments}>
                            <div className={styles.text}>State</div>
                            {labels.map((label) => (
                                <span key={label.id} className={styles.attachment}>
                                    <Label size="medium" name={label.name} color={label.color}/>
                                </span>))}
                        </div>
                    </div>
                    {/*<DescriptionEdit>*/}
                    {/*        <button*/}
                    {/*            type="button"*/}
                    {/*            className={classNames(styles.descriptionText, styles.cursorPointer)}*/}
                    {/*        >*/}
                    {/*            <Markdown linkStopPropagation linkTarget="_blank">*/}

                    {/*            </Markdown>*/}
                    {/*        </button>*/}
                    {/*        <button type="button" className={styles.descriptionButton}>*/}
                    {/*            <span className={styles.descriptionButtonText}>*/}
                    {/*                {('action.addMoreDetailedDescription')}*/}
                    {/*            </span>*/}
                    {/*        </button>*/}
                    {/*</DescriptionEdit>*/}
                    {/*<div className={styles.descriptionText}>*/}
                    {/*    <Markdown linkStopPropagation linkTarget="_blank">*/}
                    {/*        */}
                    {/*    </Markdown>*/}
                    {/*</div>*/}
                </Grid.Column>
                <Grid.Column width={4} className={styles.sidebarPadding}>
                    <div className={styles.actions}>
                        <span className={styles.actionsTitle}>{'Add to card'}</span>
                        <DueDateEditPopup defaultValue={dueDate}>
                            <Button fluid className={styles.actionButton}>
                            <Icon name="calendar check outline" className={styles.actionIcon}/>
                                </Button>
                            </DueDateEditPopup>
                        </div>
                        <div className={styles.actions}>
                            <span className={styles.actionsTitle}>{'Actions'}</span>
                            <CardMovePopup>
                                <Button
                                    fluid
                                    className={styles.actionButton}>
                                    <Icon name="share square outline" className={styles.actionIcon}/>
                                    {("Change state")}
                                </Button>
                            </CardMovePopup>
                            <DeletePopup
                                title="common.deleteCard"
                                content="common.areYouSureYouWantToDeleteThisCard"
                                buttonContent="action.deleteCard"
                            >
                                <Button fluid className={styles.actionButton}>
                                    <Icon name="trash alternate outline" className={styles.actionIcon}/>
                                    {('Delete Task')}
                                </Button>
                            </DeletePopup>
                        </div>
                    </Grid.Column>
            </Grid.Row>

        </Grid>
    );

    return (
        <Modal open closeIcon centered={false} className={styles.wrapper}>
            {contentNode}
        </Modal>
    );
}

CardModal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  dueDate: PropTypes.instanceOf(Date)
};

CardModal.defaultProps = {
  description: undefined,
  dueDate: undefined,
};

export default CardModal;
