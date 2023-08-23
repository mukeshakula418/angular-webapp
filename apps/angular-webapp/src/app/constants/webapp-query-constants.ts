import { Promo } from '../products/promo';

export const getProductExportQuery = (productName: string) => {
  const query = `query exportProduct($productName: String!) {
      products(where: {product_name: {_eq: $productName}}) {
        product_id
        product_name
        product_code
        release_date
        product_description
        price
        rating
        image_link
      }
    }`;

  return {
    query,
    variables: {
      productName,
    },
  };
};

export const getProductsQuery = () => {
  const query = `query getProducts {
        products {
            product_id
            product_name
            product_code
            release_date
            product_description
            price
            rating
            image_link
        }
    }`;
  return {
    query,
  };
};

export const getProductByIdQuery = (id: number) => {
  const query = `
      query getProductsById($id:bigint) {
        products(where: {product_id: {_eq: $id}}) {
            product_id
            product_name
            product_code
            release_date
            product_description
            price
            rating
            image_link
        }
      }`;
  return {
    query,
    variables: {
      id,
    },
  };
};

export const insertProduct = (iProduct: any) => {
  const query = `first
    mutation insert_products($object: products_insert_input!) {
      insert_products_one(object: $object) {
          product_name
          product_code
          release_date
          product_description
          price
          rating
          image_link
      }
    }`;
  return {
    query,
    variables: {
      object: {
        product_name: iProduct.product_name,
        product_code: iProduct.product_code,
        release_date: iProduct.release_date,
        product_description: iProduct.product_description,
        price: iProduct.price,
        rating: iProduct.rating,
        image_link: iProduct.image_link,
      },
    },
  };
};

export const editProductsMutation = (
  productId: number,
  updatedProduct: any
) => {
  console.log('inside mutation editProductsMutation id=', productId);
  console.log(
    'inside mutation editProductsMutation updatedProduct=',
    updatedProduct
  );
  const query = `
    mutation editProductsMutation($productId: bigint!, $updatedProduct: products_set_input!) {
      update_products_by_pk(pk_columns: {product_id: $productId }, 
        _set: $updatedProduct) {
        product_name
        product_code
        product_description
        updated_at
        release_date
        price
        rating
        image_link
      }
    }`;
  return {
    query,
    variables: {
      productId: updatedProduct.product_id,
      updatedProduct: {
        product_name: updatedProduct.product_name,
        product_code: updatedProduct.product_code,
        product_description: updatedProduct.product_description,
        updated_at: 'now()',
        release_date: updatedProduct.release_date,
        price: updatedProduct.price,
        rating: updatedProduct.rating,
        image_link: updatedProduct.image_link,
      },
    },
  };
};

export const deleteProductQuery = (id: number) => {
  const query = `
    mutation deleteProduct($id:bigint) {
        delete_products(where: {product_id: {_eq: $id}}) {
        returning {
              product_id
              product_name
              product_code
              release_date
              product_description
              price
              rating
              image_link
            }
        }
    }`;
  return {
    query,
    variables: {
      id,
    },
  };
};

export const insertPromoMutation = (promoData: Promo) => {
  const query = `
    mutation insert_promo_data($promoData: promo_insert_input!) {
      insert_promo_one(object: $promoData) {
        first_name
        last_name
        contact
        email
      }
    }`;
  return {
    query,
    variables: {
      promoData: {
        first_name: promoData.first_name,
        last_name: promoData.last_name,
        email: promoData.email,
        contact: promoData.contact,
      },
    },
  };
};

// public getProductExportQuery1(productName: string) {
//     const query = `query exportProduct($productName: String!) {
//       products(where: {product_name: {_eq: $productName}}) {
//         product_id
//         product_name
//         product_code
//         release_date
//         product_description
//         price
//         rating
//         image_link
//       }
//     }`;
//
//     return {
//         query,
//         variables: {
//             productName,
//         },
//     };
// }

// public getProductsQuery() {
//     const query = `query getProducts {
//         products {
//             product_id
//             product_name
//             product_code
//             release_date
//             product_description
//             price
//             rating
//             image_link
//         }
//     }`;
//     return {
//         query,
//     };
// }
