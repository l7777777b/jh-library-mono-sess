import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './wish-list.reducer';
import { IWishList } from 'app/shared/model/wish-list.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWishListDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WishListDetail = (props: IWishListDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { wishListEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhlibrarymonosessApp.wishList.detail.title">WishList</Translate> [<b>{wishListEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="jhlibrarymonosessApp.wishList.title">Title</Translate>
            </span>
          </dt>
          <dd>{wishListEntity.title}</dd>
          <dt>
            <span id="restricted">
              <Translate contentKey="jhlibrarymonosessApp.wishList.restricted">Restricted</Translate>
            </span>
          </dt>
          <dd>{wishListEntity.restricted ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="jhlibrarymonosessApp.wishList.customer">Customer</Translate>
          </dt>
          <dd>{wishListEntity.customerId ? wishListEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/wish-list" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/wish-list/${wishListEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ wishList }: IRootState) => ({
  wishListEntity: wishList.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WishListDetail);
