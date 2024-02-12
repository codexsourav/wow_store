import next from "next"
import Link from "next/link"
import Image from 'next/image'
export default function CollAction() {
  return (
   <>
   
   
<section className="client-satisfied">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <ul>
          <li>
            <div className="client-sat-col">
              <div className="iconcol">
                <Image className="animfade" src="/images/c1.svg" alt='Fast Delivery' width={94} height={51} />
              </div>
              <div className="satItems">Fast Delivery</div>
            </div>
          </li>
          <li>
            <div className="client-sat-col">
              <div className="iconcol">
                 <Image src="/images/c2.svg" alt='Free Shipping' className="animfade"  width={41} height={51} />
              </div>
              <div className="satItems">Free Shipping</div>
            </div>
          </li>
          <li>
            <div className="client-sat-col">
              <div className="iconcol">
                <Image src="/images/c3.svg" alt='Best Quality' className="animfade" width={47} height={51}  />
              </div>
              <div className="satItems">Best Quality</div>
            </div>
          </li>
          <li>
            <div className="client-sat-col">
              <div className="iconcol">
                <Image src="/images/c4.svg" alt='Watch Care' className="animfade" width={51} height={51} />
              </div>
              <div className="satItems">Watch Care</div>
            </div>
          </li>
          <li>
            <div className="client-sat-col">
              <div className="iconcol">
                <Image src="/images/c5.svg" alt='Customer Support' className="animfade" width={51} height={51} />
              </div>
              <div className="satItems">Customer Support</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
      </>
  )
}
