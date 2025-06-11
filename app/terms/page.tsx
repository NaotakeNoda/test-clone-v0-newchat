import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">利用規約</h1>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="mb-6">
            この利用規約（以下「本規約」といいます）は、株式会社○○（以下「当社」といいます）が提供する「塾講師マッチングポータル」（以下「本サービス」といいます）の利用条件を定めるものです。
            本サービスをご利用の際には、本規約に同意したものとみなされますので、ご利用前に必ずお読みください。
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第1条（定義）</h2>
            <p>本規約において使用する用語の定義は、以下の各号に定めるとおりとします。</p>
            <ol className="list-decimal pl-8 space-y-2 mt-3">
              <li>「利用者」とは、本サービスを利用する全ての方をいいます。</li>
              <li>「会員」とは、本サービスに会員登録を行った利用者をいいます。</li>
              <li>「企業」とは、本サービスに求人情報を掲載する塾、学習塾、予備校等の教育機関をいいます。</li>
              <li>「講師」とは、本サービスを通じて塾講師の職を探す会員をいいます。</li>
              <li>
                「個人情報」とは、会員に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の会員を識別することができるものをいいます。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第2条（本規約の適用）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                本規約は、本サービスの提供条件および本サービスの利用に関する当社と利用者との間の権利義務関係を定めることを目的とし、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されます。
              </li>
              <li>当社が本サービス上で掲載する本サービス利用に関するルールは、本規約の一部を構成するものとします。</li>
              <li>
                本規約の内容と、前項のルールその他の本規約外における本サービスの説明等とが異なる場合は、本規約の規定が優先して適用されるものとします。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第3条（会員登録）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                本サービスの利用を希望する者は、本規約に同意の上、当社の定める方法によって会員登録の申請を行うものとします。
              </li>
              <li>
                当社は、前項の申請を行った者が以下の各号のいずれかに該当する場合は、会員登録を拒否することがあります。
                <ol className="list-decimal pl-8 space-y-1 mt-2">
                  <li>当社に提供された情報の全部または一部につき虚偽、誤記または記載漏れがあった場合</li>
                  <li>
                    未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合
                  </li>
                  <li>
                    反社会的勢力等（暴力団、暴力団員、暴力団準構成員、暴力団関係企業、総会屋、社会運動等標ぼうゴロ、特殊知能暴力集団その他これらに準ずる者を意味します。以下同じ。）である、または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力等との何らかの交流もしくは関与を行っていると当社が判断した場合
                  </li>
                  <li>過去に本規約に違反したことがある者からの申請である場合</li>
                  <li>その他、当社が会員登録を適当でないと判断した場合</li>
                </ol>
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第4条（個人情報の取扱い）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                当社は、本サービスの提供にあたり、利用者から取得する個人情報を、当社の「プライバシーポリシー」に従い適切に取り扱います。
              </li>
              <li>
                当社は、利用者が本サービスを通じて企業に提供した個人情報について、一切の責任を負わないものとします。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第5条（禁止事項）</h2>
            <p className="mb-3">
              利用者は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。
            </p>
            <ol className="list-decimal pl-8 space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                当社、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシー、名誉、その他の権利または利益を侵害する行為
              </li>
              <li>
                本サービスを通じて入手した情報を、複製、販売、出版その他方法の如何を問わず、私的利用の範囲を超えて利用する行為
              </li>
              <li>
                本サービスによって得られた情報を利用して、当社または第三者に対して金銭等を要求する行為、または不利益もしくは損害を与える行為
              </li>
              <li>政治的または宗教的な勧誘行為</li>
              <li>虚偽の情報を登録する行為</li>
              <li>
                当社が定める方法以外の方法で、本サービスに関連するデータのリバースエンジニアリング、逆コンパイル、または逆アセンブルを行う行為
              </li>
              <li>本サービスのサーバーやネットワークシステムに支障を与える行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
              <li>他の利用者に成りすます行為</li>
              <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">
              第6条（本サービスの提供の停止等）
            </h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                <ol className="list-decimal pl-8 space-y-1 mt-2">
                  <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                  <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                  <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                  <li>その他、当社が本サービスの提供が困難と判断した場合</li>
                </ol>
              </li>
              <li>
                当社は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第7条（著作権）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                利用者は、本サービスを利用して投稿等を行うにあたり、自らが投稿等に関する著作権を有していること、または投稿等を行うことについて正当な権限を有していることを表明し、保証するものとします。
              </li>
              <li>
                利用者は、本サービスを利用して投稿等を行うにあたり、当社に対し、当該投稿等を本サービスの運営、改良、宣伝等のために利用する権利（当社が第三者に対して再許諾する権利を含みます）を無償で許諾するものとします。
              </li>
              <li>
                利用者は、前項に基づき当社に利用を許諾した投稿等について、当社および当社から権利を承継しまたは許諾された者に対して著作者人格権を行使しないことに同意するものとします。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第8条（退会）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>会員は、当社の定める退会手続により、本サービスから退会できるものとします。</li>
              <li>
                退会にあたり、当社に対して負っている債務がある場合は、会員は、当社に対して負っている債務の一切について当然に期限の利益を失い、直ちに当社に対して全ての債務の支払を行わなければなりません。
              </li>
              <li>
                退会後の利用者の個人情報の取扱いについては、第4条および当社の「プライバシーポリシー」の定めに従うものとします。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">
              第9条（保証の否認および免責事項）
            </h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </li>
              <li>
                当社は、本サービスに起因して利用者に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。
              </li>
              <li>
                当社は、本サービスに関して、利用者と他の利用者または第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">
              第10条（サービス内容の変更等）
            </h2>
            <p>
              当社は、利用者に通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによって利用者に生じた損害について一切の責任を負いません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第11条（利用規約の変更）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>
                当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。
              </li>
              <li>
                変更後の利用規約は、当社ウェブサイトに掲載された時点から効力を生じるものとし、利用者は本規約の変更後も本サービスを使い続けることにより、変更後の本規約に対する有効かつ取消不能な同意をしたものとみなされます。
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第12条（通知または連絡）</h2>
            <p>
              利用者と当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、利用者が登録した連絡先に宛てて通知または連絡を行えば足りるものとし、当該通知または連絡が利用者に到達しなかったことに起因して発生した損害については、当社は一切責任を負いません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">
              第13条（権利義務の譲渡の禁止）
            </h2>
            <p>
              利用者は、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-primary/30">第14条（準拠法・裁判管轄）</h2>
            <ol className="list-decimal pl-8 space-y-2">
              <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
              <li>
                本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
              </li>
            </ol>
          </section>

          <div className="mt-8 text-right">
            <p>以上</p>
            <p>制定日：20XX年XX月XX日</p>
            <p>最終更新日：20XX年XX月XX日</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
