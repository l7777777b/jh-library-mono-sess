import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './borrowed-book.reducer';
import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBorrowedBookDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BorrowedBookDetail = (props: IBorrowedBookDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { borrowedBookEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhlibrarymonosessApp.borrowedBook.detail.title">BorrowedBook</Translate> [<b>{borrowedBookEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="borrowDate">
              <Translate contentKey="jhlibrarymonosessApp.borrowedBook.borrowDate">Borrow Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={borrowedBookEntity.borrowDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="jhlibrarymonosessApp.borrowedBook.book">Book</Translate>
          </dt>
          <dd>{borrowedBookEntity.bookName ? borrowedBookEntity.bookName : ''}</dd>
          <dt>
            <Translate contentKey="jhlibrarymonosessApp.borrowedBook.client">Client</Translate>
          </dt>
          <dd>{borrowedBookEntity.clientEmail ? borrowedBookEntity.clientEmail : ''}</dd>
        </dl>
        <Button tag={Link} to="/borrowed-book" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/borrowed-book/${borrowedBookEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ borrowedBook }: IRootState) => ({
  borrowedBookEntity: borrowedBook.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BorrowedBookDetail);
