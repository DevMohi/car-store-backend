import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Exclude fields for filtering
    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'minPrice',
      'maxPrice',
      'availability',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Price Range Filter
    const priceFilter: any = {};
    const minPrice = Number(this.query?.minPrice);
    const maxPrice = Number(this.query?.maxPrice);

    if (!isNaN(minPrice)) {
      priceFilter.$gte = minPrice;
    }

    if (!isNaN(maxPrice)) {
      priceFilter.$lte = maxPrice;
    }

    if (Object.keys(priceFilter).length) {
      queryObj.price = priceFilter;
    }

    // Handle availability (inStock)
    const availability = this.query?.availability;
    if (availability === 'in-stock') {
      queryObj.inStock = true; // Explicitly set to boolean true
    } else if (availability === 'out-of-stock') {
      queryObj.inStock = false; // Explicitly set to boolean false
    }

    // Logging the final query
    console.log('Query After Filtering:', queryObj);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
