import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoryDetail = (props: ICategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { categoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhlibrarymonosessApp.category.detail.title">Category</Translate> [<b>{categoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">
              <Translate contentKey="jhlibrarymonosessApp.category.description">Description</Translate>
            </span>
          </dt>
          <dd>{categoryEntity.description}</dd>
          <dt>
            <span id="sortOrder">
              <Translate contentKey="jhlibrarymonosessApp.category.sortOrder">Sort Order</Translate>
            </span>
          </dt>
          <dd>{categoryEntity.sortOrder}</dd>
          <dt>
            <span id="dateAdded">
              <Translate contentKey="jhlibrarymonosessApp.category.dateAdded">Date Added</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={categoryEntity.dateAdded} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dateModified">
              <Translate contentKey="jhlibrarymonosessApp.category.dateModified">Date Modified</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={categoryEntity.dateModified} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="jhlibrarymonosessApp.category.status">Status</Translate>
            </span>
          </dt>
          <dd>{categoryEntity.status}</dd>
          <dt>
            <Translate contentKey="jhlibrarymonosessApp.category.parent">Parent</Translate>
          </dt>
          <dd>{categoryEntity.parentId ? categoryEntity.parentId : ''}</dd>
          <dt>
            <Translate contentKey="jhlibrarymonosessApp.category.product">Product</Translate>
          </dt>
          <dd>
            {categoryEntity.products
              ? categoryEntity.products.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.title}</a>
                    {i === categoryEntity.products.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/category" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/category/${categoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ category }: IRootState) => ({
  categoryEntity: category.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
