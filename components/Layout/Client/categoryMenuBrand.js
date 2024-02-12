export default function CategoryMenuBrand({ data }) {

    return (
        <>
            <h3>Shop By Brand</h3>
            {data == null ? <p>Loading...</p> : <ul className="shopByBrand">
                {
                    data['brand'].length == 0 ? <li>No Brands Found</li> : data['brand'].map((e, i) => <li key={i}><a href={`/product?brand=${e.slug}`}>{e.name}</a></li>)
                }

            </ul>}
        </>
    );

}


