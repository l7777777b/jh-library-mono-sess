import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWishList } from 'app/shared/model/wish-list.model';
import { getEntities as getWishLists } from 'app/entities/wish-list/wish-list.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductUpdate = (props: IProductUpdateProps) => {
  const [wishListId, setWishListId] = useState('0');
  const [categoryId, setCategoryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productEntity, wishLists, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWishLists();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhlibrarymonosessApp.product.home.createOrEditLabel">
            <Translate contentKey="jhlibrarymonosessApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="product-title">
                  <Translate contentKey="jhlibrarymonosessApp.product.title">Title</Translate>
                </Label>
                <AvField
                  id="product-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="keywordsLabel" for="product-keywords">
                  <Translate contentKey="jhlibrarymonosessApp.product.keywords">Keywords</Translate>
                </Label>
                <AvField id="product-keywords" type="text" name="keywords" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="product-description">
                  <Translate contentKey="jhlibrarymonosessApp.product.description">Description</Translate>
                </Label>
                <AvField id="product-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="ratingLabel" for="product-rating">
                  <Translate contentKey="jhlibrarymonosessApp.product.rating">Rating</Translate>
                </Label>
                <AvField id="product-rating" type="string" className="form-control" name="rating" />
              </AvGroup>
              <AvGroup>
                <Label id="dateAddedLabel" for="product-dateAdded">
                  <Translate contentKey="jhlibrarymonosessApp.product.dateAdded">Date Added</Translate>
                </Label>
                <AvField id="product-dateAdded" type="date" className="form-control" name="dateAdded" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifiedLabel" for="product-dateModified">
                  <Translate contentKey="jhlibrarymonosessApp.product.dateModified">Date Modified</Translate>
                </Label>
                <AvField id="product-dateModified" type="date" className="form-control" name="dateModified" />
              </AvGroup>
              <AvGroup>
                <Label for="product-wishList">
                  <Translate contentKey="jhlibrarymonosessApp.product.wishList">Wish List</Translate>
                </Label>
                <AvInput id="product-wishList" type="select" className="form-control" name="wishListId">
                  <option value="" key="0" />
                  {wishLists
                    ? wishLists.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  wishLists: storeState.wishList.entities,
  categories: storeState.category.entities,
  productEntity: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating,
  updateSuccess: storeState.product.updateSuccess
});

const mapDispatchToProps = {
  getWishLists,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
