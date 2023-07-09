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
        }
    };
};

export const insertProduct = (iProduct: any) => {
    const query = `
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
            }
        }
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
