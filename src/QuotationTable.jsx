/*
TODO remove bootstrap and replace with MUI.
*/

import { Button, Container, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.qty * v.ppu - v.disc, 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  const handleClear = () => {
    clearAll()
  }

  return (
    <Container>
      <h1>Quotation</h1>
      <Button variant="outline-dark" onClick ={handleDelete}>
        Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Discount</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{
          data.map((v, i) => {
            let amount = v.qty * v.ppu - v.disc;
            return (
              <tr key={i}>
                <td className={style.textCenter}><BsFillTrashFill onClick={() => handleDelete(i)} /></td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.disc}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textRight}>{amount}</td>
              </tr>
            );
          })
        }</tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>{total}</td>
          </tr>
          <tr>
            <td colSpan={5} className={style.textRight}>
              Total (after Discount)
            </td>
            <td className={style.textRight}>{totalDiscount}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
