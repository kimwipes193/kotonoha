import legalMessages from './legal-messages.json';
// Columns: Japanese source | English | French | Simplified Chinese | Korean.
const rows = String.raw`
ニックネームで検索|Search by nickname|Rechercher par pseudo|搜索昵称|닉네임으로 검색
一致するフレンドが見つかりません。|No friends match your search.|Aucun ami correspondant.|未找到匹配的好友。|일치하는 친구가 없습니다.
送信取消|Unsend|Annuler l’envoi|撤回|전송 취소
送信を取り消しました|Message unsent|Envoi annulé|消息已撤回|전송이 취소되었습니다
このメッセージの送信を取り消しますか？相手の画面からも削除されます。|Unsend this message? It will also be removed for the recipient.|Annuler cet envoi ? Le message sera aussi supprimé chez le destinataire.|撤回此消息？对方也将无法查看。|전송을 취소할까요? 상대방의 화면에서도 삭제됩니다.
更新日：2026年9月23日|Updated: September 23, 2026|Mise à jour : 23 septembre 2026|更新日期：2026年9月23日|업데이트: 2026년 9월 23일
キャンセル|Cancel|Annuler|取消|취소
好きな食べ物|Favorite food|Plat préféré|喜欢的食物|좋아하는 음식
好きな色|Favorite color|Couleur préférée|喜欢的颜色|좋아하는 색
好きな場所|Favorite place|Lieu préféré|喜欢的地方|좋아하는 장소
好きな作品|Favorite book, film or show|Œuvre préférée|喜欢的作品|좋아하는 작품
わたしらしく飾る|Make it yours|À votre image|装饰出你的风格|나답게 꾸미기
背景|Background|Fond|背景|배경
星くず|Stardust|Étoiles|星星|별빛
ギンガム|Gingham|Vichy|格纹|깅엄
水玉|Polka dots|Pois|波点|도트
お手紙|Letter paper|Papier à lettres|信纸|편지지
ラベンダー|Lavender|Lavande|薰衣草紫|라벤더
ミント|Mint|Menthe|薄荷绿|민트
クリーム|Cream|Crème|奶油色|크림
プロフィールには獲得済みステッカーを繰り返し使えます。枚数は消費しません。|Collected stickers are reusable on your profile without using up your stock.|Les stickers obtenus sont réutilisables sur votre profil sans consommer votre stock.|个人资料可重复使用已获得的贴纸，不消耗数量。|획득한 스티커는 프로필에서 수량 소모 없이 반복 사용할 수 있어요.
プロフィール帳は承認済みフレンドにのみ公開されます。|Your profile book is visible only to accepted friends.|Votre carnet est visible uniquement par vos amis acceptés.|资料册仅对已确认的好友公开。|프로필북은 승인된 친구에게만 공개돼요.
プロフィールの飾りと好きなものを確認してください。|Please check your profile decorations and favorites.|Vérifiez la décoration et les favoris du profil.|请检查个人资料装饰和喜好。|프로필 장식과 좋아하는 것을 확인해 주세요.
獲得済みのステッカーを選んでください。|Choose a sticker you have collected.|Choisissez un sticker déjà obtenu.|请选择已获得的贴纸。|획득한 스티커를 선택해 주세요.
本文に貼る|Move to text|Placer sur le texte|贴到正文|본문에 붙이기
絵に貼る|Move to drawing|Placer sur le dessin|贴到图画|그림에 붙이기
前のプロフィール|Previous profile|Profil précédent|上一个资料页|이전 프로필
次のプロフィール|Next profile|Profil suivant|下一个资料页|다음 프로필
プロフィール帳|Profile book|Carnet de profils|个人资料册|프로필북
プロフィールを編集|Edit profile|Modifier le profil|编辑个人资料|프로필 수정
誕生日|Birthday|Anniversaire|生日|생일
更新日：2026年9月22日|Updated: September 22, 2026|Mise à jour : 22 septembre 2026|更新日期：2026年9月22日|업데이트: 2026년 9월 22일
プロフィールとフレンド追加|Profile and add friends|Profil et ajout d’amis|个人资料与添加好友|프로필 및 친구 추가
プロフィール|Profile|Profil|个人资料|프로필
会話一覧|Conversations|Conversations|会话列表|대화 목록
メッセージ|Messages|Messages|消息|메시지
メッセージに戻る|Back to messages|Retour aux messages|返回消息|메시지로 돌아가기
日記のお便り|A diary letter|Une lettre de journal|日记来信|일기 편지
あなた: |You: |Vous : |你：|나:
メッセージを送ってみよう|Say hello|Envoyez un petit mot|发条消息吧|메시지를 보내 보세요
未読メッセージ|Unread messages|Messages non lus|未读消息|읽지 않은 메시지
お便りが待っています|A letter is waiting|Une lettre vous attend|有一封来信在等你|편지가 기다리고 있어요
フレンドと、言葉や日記を送り合おう。|Share messages and diaries with friends.|Échangez des messages et des journaux entre amis.|与好友互发消息和日记。|친구와 메시지와 일기를 주고받아요.
会話一覧に戻る|Back to conversations|Retour aux conversations|返回会话列表|대화 목록으로 돌아가기
会話の設定|Conversation settings|Options de la conversation|会话设置|대화 설정
以前のやり取り|Earlier messages|Messages précédents|更早的消息|이전 대화
新しいメッセージ|New messages|Nouveaux messages|新消息|새 메시지
メッセージを入力…|Write a message…|Écrire un message…|输入消息…|메시지 입력…
あなたから|From you|De votre part|你发送的|내가 보낸 편지
既読|Read|Lu|已读|읽음
送信|Send|Envoyer|发送|보내기
再読み込み|Reload|Recharger|重新加载|다시 불러오기
メッセージを読み込めませんでした。|Could not load messages.|Impossible de charger les messages.|无法加载消息。|메시지를 불러오지 못했어요.
メッセージを確認してください。|Please check the message.|Vérifiez le message.|请检查消息。|메시지를 확인해 주세요.
メッセージは1〜1,000文字で書いてください。|Write 1–1,000 characters.|Écrivez entre 1 et 1 000 caractères.|请输入1至1000个字符。|1~1,000자로 작성해 주세요.
履歴を確認してください。|Please reload the conversation.|Veuillez recharger la conversation.|请重新加载会话。|대화를 다시 불러와 주세요.
少し待ってからメッセージを送ってください。|Please wait before sending more messages.|Patientez avant d’envoyer d’autres messages.|请稍等再发送消息。|잠시 후에 메시지를 보내 주세요.
きょうの日記|Today’s diary|Journal du jour|今天的日记|오늘의 일기
本日の受付|Today’s post|Courrier du jour|今日收件|오늘의 접수
おしまい|Closed|Terminé|已结束|마감
匿名に戻す|Back to anonymous|Retour à l’anonyme|返回匿名|익명으로 돌아가기
原文|Original|Texte original|原文|원문
{name}のプロフィール帳|{name}’s profile book|Le carnet de {name}|{name}的资料册|{name}의 프로필북
わたし|My|Moi|我|나
誕生日（4桁）|Birthday (4 digits)|Anniversaire (4 chiffres)|生日（4位数字）|생일 (4자리)
例：4月15日は0415。未設定でも利用できます。|Example: April 15 is 0415. Optional.|Exemple : le 15 avril s’écrit 0415. Facultatif.|例如4月15日输入0415，可以留空。|예: 4월 15일은 0415. 비워 두어도 괜찮아요.
コピー|Copy|Copier|复制|복사
コピー済み|Copied|Copié|已复制|복사 완료
コピーできませんでした。コードを選択してコピーしてください。|Copy failed. Select and copy the code.|Copie impossible. Sélectionnez puis copiez le code.|复制失败，请选中好友码后复制。|복사하지 못했어요. 코드를 선택해서 복사해 주세요.
全{count}種類・各約{chance}%|{count} varieties · About {chance}% each|{count} modèles · Environ {chance} % chacun|共{count}种 · 每种约{chance}%|총 {count}종 · 각 약 {chance}%
わたしのプロフィール帳|My friendship book|Mon carnet d’amitié|我的个人资料册|나의 프로필북
なかよしのしるし、ここにぺたり。|A little keepsake of our friendship.|Un petit souvenir de notre amitié.|把友谊的印记贴在这里。|친해진 기념으로 여기에 붙여요.
写真を準備しています…|Preparing photo…|Préparation de la photo…|正在准备照片…|사진 준비 중…
写真フォルダから選ぶ|Choose a photo|Choisir une photo|从相册选择|사진첩에서 고르기
プロフィール写真を選ぶ|Choose profile photo|Choisir la photo de profil|选择头像照片|프로필 사진 선택
写真はまんなかを正方形に切り取ります。|The center is cropped into a square.|Le centre est recadré en carré.|照片中心会裁剪为正方形。|사진 가운데를 정사각형으로 잘라요.
保存するまで、写真は送信されません。|Your photo is not uploaded until you save.|La photo n’est envoyée qu’après l’enregistrement.|保存前不会上传照片。|저장하기 전에는 사진이 전송되지 않아요.
絵文字アイコンもえらべるよ|Or pick an emoji|Ou choisissez un emoji|也可以选择表情头像|이모지 아이콘도 고를 수 있어요
なんて呼んだらいい？|What should we call you?|Comment vous appeler ?|怎么称呼你？|뭐라고 부르면 좋을까요?
写真は15MB以下で選んでください。|Choose a photo under 15 MB.|Choisissez une photo de moins de 15 Mo.|请选择15MB以下的照片。|15MB 이하의 사진을 선택해 주세요.
写真を読み込めませんでした。JPEG・PNGなど別の写真をお試しください。|Unable to read this photo. Try a JPEG or PNG image.|Photo illisible. Essayez une image JPEG ou PNG.|无法读取照片，请尝试JPEG或PNG等其他照片。|사진을 읽지 못했어요. JPEG나 PNG 등 다른 사진을 선택해 주세요.
プロフィールのアイコン、ニックネーム、誕生日（月日）、フレンドコードと承認関係を保存します。プロフィールは承認済みフレンドにのみ表示し、匿名交換には含めません。フレンド宛ての日記は双方の投函後に相手へ表示し、開封日時も記録します。誕生日はお祝いと特典の付与に使用します。|We store your profile icon, nickname, birthday (month and day), friend code and accepted friendships. Only accepted friends see your profile; anonymous exchanges do not include it. Friend diaries become visible after both send, and opening times are recorded. Birthdays are used for greetings and gifts.|Nous conservons votre icône, surnom, anniversaire (mois et jour), code ami et liens acceptés. Seuls vos amis acceptés voient votre profil, absent des échanges anonymes. Les journaux entre amis deviennent visibles après les deux envois et les ouvertures sont enregistrées. Les anniversaires servent aux vœux et cadeaux.|我们保存头像、昵称、生日（月日）、好友码和已同意的好友关系。个人资料仅向已通过的好友展示，不用于匿名交换。双方投递后才展示好友日记，并记录打开时间。生日用于祝福和赠礼。|프로필 아이콘, 닉네임, 생일(월일), 친구 코드와 승인 관계를 저장해요. 프로필은 승인된 친구에게만 표시하고 익명 교환에는 포함하지 않아요. 친구 일기는 양쪽이 투함한 후 표시되며 열람 시간도 기록해요. 생일은 축하와 선물에 사용해요.
フレンド|Friends|Amis|好友|친구
Googleでログインすると、プロフィールとフレンド機能を利用できます。|Sign in with Google to use profiles and friends.|Connectez-vous avec Google pour utiliser les profils et les amis.|使用Google登录即可使用个人资料和好友功能。|Google로 로그인하면 프로필과 친구 기능을 사용할 수 있어요.
知っている誰かと、ひとことずつ。|A little letter to someone you know.|Un petit mot à quelqu’un que vous connaissez.|与熟悉的人，交换点滴。|아는 사람과 한마디씩 나눠요.
あなたのプロフィール|Your profile|Votre profil|你的个人资料|내 프로필
アイコン・ニックネーム・誕生日は、承認したフレンドだけに表示されます。匿名交換には表示されません。|Only accepted friends can see your icon, nickname and birthday. Anonymous exchanges stay anonymous.|Seuls vos amis acceptés voient votre icône, surnom et anniversaire. Les échanges anonymes restent anonymes.|头像、昵称和生日仅向已通过的好友展示，不会在匿名交换中显示。|아이콘, 닉네임, 생일은 승인한 친구에게만 표시돼요. 익명 교환에는 표시되지 않아요.
アイコン|Icon|Icône|头像|아이콘
ニックネーム|Nickname|Surnom|昵称|닉네임
誕生日（月-日）|Birthday (MM-DD)|Anniversaire (MM-JJ)|生日（月-日）|생일 (월-일)
年は保存しません。例：04-15。未設定でも利用できます。|No year is stored. Example: 04-15. Optional.|L’année n’est pas enregistrée. Exemple : 04-15. Facultatif.|不保存年份。例如04-15，可以留空。|연도는 저장하지 않아요. 예: 04-15. 비워 두어도 괜찮아요.
プロフィールを保存|Save profile|Enregistrer le profil|保存资料|프로필 저장
あなたのフレンドコード|Your friend code|Votre code ami|你的好友码|내 친구 코드
コードを相手に教えて、申請を承認するとフレンドになります。|Share your code and accept a request to become friends.|Partagez votre code et acceptez une demande pour devenir amis.|分享好友码，通过申请后成为好友。|코드를 알려 주고 요청을 승인하면 친구가 돼요.
フレンドを追加|Add a friend|Ajouter un ami|添加好友|친구 추가
相手のフレンドコード|Their friend code|Son code ami|对方的好友码|상대방 친구 코드
申請を送る|Send request|Envoyer une demande|发送申请|요청 보내기
承認待ち|Awaiting acceptance|En attente|等待通过|승인 대기 중
フレンド申請が届いています|Friend request received|Demande d’amitié reçue|收到好友申请|친구 요청이 도착했어요
承認する|Accept|Accepter|通过|승인
申請を取り消す|Cancel request|Annuler la demande|取消申请|요청 취소
見送る|Decline|Refuser|婉拒|거절
フレンドとの交換日記|Diaries with friends|Journaux entre amis|好友交换日记|친구와 교환일기
フレンド宛ては全体で1日1通。双方が投函すると開封できます。日付が違っても交換でき、相手が開封するまでは次の投函を待ちます。|One friend letter per day in total. Both must send before reading. Different dates are fine. Wait for your friend to open your letter before sending another.|Un envoi à un ami par jour au total. Chacun doit envoyer avant de lire. Les dates peuvent différer. Attendez l’ouverture par votre ami avant le prochain envoi.|好友日记每天总共一封，双方投递后才能打开。可交换不同日期的日记，对方打开前无法再次投递。|친구에게는 하루에 총 한 통. 서로 보내야 읽을 수 있어요. 날짜가 달라도 교환할 수 있으며 상대가 열 때까지 다음 투함은 기다려 주세요.
まだフレンドはいません。|No friends yet.|Pas encore d’amis.|还没有好友。|아직 친구가 없어요.
お便りが待っています|A letter is waiting|Une lettre vous attend|有信件在等待|편지가 기다리고 있어요
このフレンドに書く|Write to this friend|Écrire à cet ami|给这位好友写日记|이 친구에게 쓰기
フレンド解除|Remove friend|Retirer cet ami|解除好友|친구 해제
あなたから|From you|De vous|你寄出的|내가 보낸 일기
フレンドから|From your friend|De votre ami|好友寄来的|친구가 보낸 일기
交換の成立待ち|Waiting for exchange|En attente d’échange|等待交换成立|교환 성립 대기
相手が開封しました|Opened by your friend|Ouvert par votre ami|对方已打开|상대가 열었어요
相手の開封待ち|Waiting to be opened|En attente d’ouverture|等待对方打开|상대방 열람 대기
お届け先|Recipient|Destinataire|收件人|받는 사람
匿名の誰か|Someone anonymous|Une personne anonyme|匿名的某个人|익명의 누군가
フレンド宛て：双方が投函すると開封できます。相手が開封するまでは次の投函を待ちます。|For a friend: both must send before reading. Wait for them to open your letter before sending another.|Pour un ami : chacun doit envoyer avant de lire. Attendez son ouverture avant un nouvel envoi.|寄给好友：双方投递后才能打开，对方打开前请等待。|친구에게: 서로 투함해야 열 수 있어요. 상대가 열 때까지 다음 투함은 기다려 주세요.
相手の開封を待っています|Waiting for your friend to open|En attente de l’ouverture par votre ami|等待对方打开|상대방 열람을 기다리고 있어요
お誕生日おめでとう。今日は、あなたが主役です。|Happy birthday. Today is your day!|Joyeux anniversaire. Aujourd’hui, c’est votre journée !|生日快乐，今天你是主角！|생일 축하해요. 오늘은 당신이 주인공이에요.
ぽすとから、お祝いのステッカーを5枚。コレクションをのぞいてみてね。|Five birthday stickers from Posto. Take a look in your collection!|Cinq autocollants d’anniversaire de Posto. Regardez votre collection !|ぽすと送你5张庆生贴纸，去收藏看看吧！|포스토가 축하 스티커 5장을 보냈어요. 컬렉션을 확인해 보세요.
ぽすとのお祝いケーキ|Posto’s birthday cake|Gâteau d’anniversaire de Posto|ぽすとの庆生蛋糕|포스토의 생일 케이크
プロフィールを保存しました。|Profile saved.|Profil enregistré.|资料已保存。|프로필을 저장했어요.
プロフィールを確認してください。|Please check your profile.|Vérifiez votre profil.|请检查个人资料。|프로필을 확인해 주세요.
フレンドコードを確認してください。|Please check the friend code.|Vérifiez le code ami.|请检查好友码。|친구 코드를 확인해 주세요.
この相手には申請できません。|You cannot send this request.|Cette demande ne peut pas être envoyée.|无法向此用户发送申请。|이 상대에게 요청할 수 없어요.
フレンドと申請は合計50件までです。|Up to 50 friends and requests in total.|50 amis et demandes au total maximum.|好友和申请总计最多50个。|친구와 요청은 합계 50개까지예요.
フレンド申請を送りました。|Friend request sent.|Demande envoyée.|好友申请已发送。|친구 요청을 보냈어요.
フレンドを確認してください。|Please check the friend.|Vérifiez cet ami.|请检查好友。|친구를 확인해 주세요.
この申請は承認できません。|This request cannot be accepted.|Cette demande ne peut pas être acceptée.|无法通过此申请。|이 요청을 승인할 수 없어요.
フレンドになりました。|You are now friends.|Vous êtes maintenant amis.|你们已成为好友。|이제 친구가 되었어요.
フレンド・申請を解除しました。|Friend or request removed.|Ami ou demande retiré.|已解除好友或申请。|친구 또는 요청을 해제했어요.
交換が成立すると読めます。|Read after both letters are sent.|Lecture après les deux envois.|交换成立后即可阅读。|교환이 성립하면 읽을 수 있어요.
日記の設定を確認してください。|Please check the diary settings.|Vérifiez les paramètres du journal.|请检查日记设置。|일기 설정을 확인해 주세요.
持っている便箋を選んでください。|Choose paper you own.|Choisissez un papier que vous possédez.|请选择已拥有的信纸。|보유한 편지지를 선택해 주세요.
フレンド宛ての日記を預かりました。|Your friend letter is safely stored.|Votre lettre pour votre ami est conservée.|已收好寄给好友的日记。|친구에게 보낼 일기를 맡았어요.
相手が日記を開くまで、次のお便りは待っていてください。|Wait until your friend opens your diary before sending again.|Attendez que votre ami ouvre le journal avant d’envoyer à nouveau.|请等对方打开日记后再投递。|상대가 일기를 열 때까지 다음 편지는 기다려 주세요.
絵ができるまで、ひとやすみ。|Watch a little drawing come to life.|Regardez le dessin prendre vie.|歇一会儿，看画慢慢出现。|그림이 완성될 때까지 잠깐 쉬어 가요.
できあがり。気持ちも、いっしょに。|All done, with a little feeling inside.|Terminé, avec un peu de tendresse.|完成了，心意也一起送达。|완성. 마음도 함께 담았어요.
完成した絵を見る|Show finished drawing|Voir le dessin terminé|查看完成的画|완성된 그림 보기
もう一度、描くところを見る|Replay the drawing|Revoir le dessin se créer|重播绘画过程|그리는 과정 다시 보기
更新日：2026年9月21日|Updated: September 21, 2026|Mise à jour : 21 septembre 2026|更新日期：2026年9月21日|업데이트: 2026년 9월 21일
手書き・絵日記の線や色も日記と一緒に保存し、交換相手に表示します。手書き部分は自動テキストチェック・翻訳の対象外です。|Handwritten strokes and colors are saved with your diary and shown to your exchange partner. Handwriting is not checked by the text filter or translated.|Les traits et couleurs sont enregistrés avec votre journal et montrés au destinataire. Les dessins ne sont ni vérifiés par le filtre textuel ni traduits.|手绘线条和颜色会随日记保存并向交换对象展示。手写部分不进行自动文字检查或翻译。|손글씨의 선과 색도 일기와 함께 저장되어 교환 상대에게 보여요. 손글씨는 자동 텍스트 검사 및 번역 대상이 아니에요.
文字|Text|Texte|文字|글자
筆・絵日記|Draw|Dessiner|绘画日记|그림일기
筆|Pen|Stylo|画笔|펜
消しゴム|Eraser|Gomme|橡皮擦|지우개
元に戻す|Undo|Annuler|撤销|실행 취소
やり直す|Redo|Rétablir|重做|다시 실행
色|Color|Couleur|颜色|색상
太さ|Width|Épaisseur|粗细|굵기
日記の書き方|Writing mode|Mode d’écriture|书写模式|작성 모드
ペンの色|Pen color|Couleur du stylo|画笔颜色|펜 색상
ペンと消しゴムの太さ|Pen and eraser width|Épaisseur du stylo et de la gomme|画笔和橡皮擦粗细|펜과 지우개 굵기
手書き・絵日記|Handwritten diary drawing|Dessin du journal manuscrit|手写绘画日记|손글씨 그림일기
画数の上限です。元に戻すと描き直せます。|Drawing limit reached. Undo to draw again.|Limite atteinte. Annulez pour redessiner.|已达笔画上限，撤销后可以继续画。|획 수 한도에 도달했어요. 실행 취소 후 다시 그릴 수 있어요.
手書きデータを確認してください。|Please check the drawing data.|Veuillez vérifier les données du dessin.|请检查手绘数据。|손글씨 데이터를 확인해 주세요.
手書き部分は翻訳されません。|Handwriting is not translated.|L’écriture manuscrite n’est pas traduite.|手写部分不会被翻译。|손글씨 부분은 번역되지 않아요.
文字は200文字まで・絵だけでもOK・1日1通・日本時間の午前0時にリセット|Up to 200 characters or just a drawing · One letter per day · Resets at midnight Japan time|200 caractères maximum ou un dessin seul · Un journal par jour · Réinitialisation à minuit au Japon|最多200字，也可只画画 · 每天一封 · 日本时间零点重置|최대 200자 또는 그림만 가능 · 하루 한 통 · 일본 시간 자정 초기화
ステッカーは1通に5枚まで。投函が成功すると貼った枚数だけ消費します。便箋は繰り返し使えます。|Up to five stickers per diary. Each attached sticker is used only after a successful post. Paper is reusable.|Jusqu’à cinq autocollants par journal. Les autocollants collés sont consommés après un envoi réussi. Le papier est réutilisable.|每封日记最多5张贴纸。投递成功后按实际张数消耗。信纸可重复使用。|일기 한 통에 스티커 최대 5장. 투함 성공 시 붙인 수량만큼 사용해요. 편지지는 계속 쓸 수 있어요.
ステッカー{number}を外す|Remove sticker {number}|Retirer l’autocollant {number}|移除贴纸{number}|스티커 {number} 제거
ステッカーは5枚までです。配置を確認してください。|Use up to five stickers and check their placement.|Utilisez au maximum cinq autocollants et vérifiez leur position.|最多可贴5张贴纸，请检查位置。|스티커는 최대 5장이에요. 배치를 확인해 주세요.
ドラッグで移動。タップして、四隅を動かすと回転・拡大縮小できます。|Drag to move. Tap, then drag a corner to rotate and resize.|Faites glisser pour déplacer. Touchez puis faites glisser un coin pour tourner et redimensionner.|拖动可移动。点击后拖动四角即可旋转和缩放。|드래그해서 이동하세요. 탭한 뒤 모서리를 드래그하면 회전하고 크기를 바꿀 수 있어요.
角をドラッグして回転・拡大縮小|Drag a corner to rotate and resize|Faites glisser un coin pour tourner et redimensionner|拖动角点旋转和缩放|모서리를 드래그해서 회전 및 크기 조절
左上の角で回転・拡大縮小|Rotate and resize from top left|Tourner et redimensionner depuis le coin supérieur gauche|左上角旋转和缩放|왼쪽 위 모서리에서 회전 및 크기 조절
右上の角で回転・拡大縮小|Rotate and resize from top right|Tourner et redimensionner depuis le coin supérieur droit|右上角旋转和缩放|오른쪽 위 모서리에서 회전 및 크기 조절
左下の角で回転・拡大縮小|Rotate and resize from bottom left|Tourner et redimensionner depuis le coin inférieur gauche|左下角旋转和缩放|왼쪽 아래 모서리에서 회전 및 크기 조절
右下の角で回転・拡大縮小|Rotate and resize from bottom right|Tourner et redimensionner depuis le coin inférieur droit|右下角旋转和缩放|오른쪽 아래 모서리에서 회전 및 크기 조절
端末の設定で動きを控えています。|Motion is reduced by your device settings.|Votre appareil limite les animations.|已根据设备设置减少动画。|기기 설정에 따라 움직임을 줄이고 있어요.
アニメーションで開封|Open with animation|Ouvrir avec animation|播放开信动画|애니메이션으로 열기
すぐに読む|Read now|Lire maintenant|直接阅读|바로 읽기
もう一度、封筒から開く|Open the envelope again|Rouvrir l’enveloppe|再次打开信封|봉투 다시 열기
翻訳先|Translate into|Traduire en|翻译为|번역 언어
翻訳中…|Translating…|Traduction…|翻译中…|번역 중…
この言語で読む|Read in this language|Lire dans cette langue|用此语言阅读|이 언어로 읽기
見本はあらかじめ用意した翻訳です。|This sample uses a prepared translation.|Cet exemple utilise une traduction préparée.|此示例使用预先准备的翻译。|견본은 미리 준비된 번역을 사용해요.
翻訳すると本文をCloudflare AIで処理します。機械翻訳には誤りが含まれることがあります。|Translation processes the text with Cloudflare AI. Machine translations may contain errors.|La traduction traite le texte avec Cloudflare AI. Elle peut contenir des erreurs.|翻译时正文将由 Cloudflare AI 处理。机器翻译可能存在错误。|번역 시 본문을 Cloudflare AI로 처리합니다. 기계 번역에는 오류가 있을 수 있어요.
言葉のお着替え中。少しお待ちください。|Giving these words a new outfit. One moment.|Les mots changent de tenue. Un instant.|文字正在换装，请稍等。|말들이 옷을 갈아입고 있어요. 잠시만요.
翻訳する言語を選んでください。|Choose a translation language.|Choisissez la langue de traduction.|请选择翻译语言。|번역할 언어를 선택해 주세요.
翻訳につながりませんでした。原文のまま読めます。時間をおいてお試しください。|Translation is unavailable. You can read the original and try again later.|La traduction est indisponible. Lisez l’original et réessayez plus tard.|暂时无法翻译。您可以阅读原文，稍后重试。|번역에 연결하지 못했어요. 원문을 읽거나 나중에 다시 시도해 주세요.
今日の翻訳の受付はおしまいです。原文を読むか、明日またお試しください。|Today’s translation limit has been reached. Read the original or try tomorrow.|La limite de traduction du jour est atteinte. Lisez l’original ou réessayez demain.|今日翻译次数已用完。请阅读原文或明天再试。|오늘의 번역 한도에 도달했어요. 원문을 읽거나 내일 다시 시도해 주세요.
あなたの言葉、封筒にそっと。|Your words, tucked into an envelope.|Vos mots, glissés dans une enveloppe.|把你的话，轻轻装进信封。|당신의 말을 봉투에 살며시.
日記を保存し、ぽすとに預けました。|Your diary is saved and in Posto's care.|Votre journal est enregistré et confié à Posto.|日记已保存，并交给波斯托保管。|일기를 저장하고 포스토에게 맡겼어요.
封筒を開けて日記を読む|Open the envelope and read|Ouvrir l'enveloppe et lire|打开信封阅读日记|봉투를 열어 일기 읽기
封筒を開けています…|Opening your letter…|Ouverture de la lettre…|正在打开信封…|봉투를 여는 중…
とん、とタップで開封。|A little tap to open.|Un petit clic pour ouvrir.|轻轻一点，拆开来信。|톡, 눌러서 열어보세요.
{name}が今日を分けてくれました。|{name} shared a little of their day.|{name} a partagé un peu de sa journée.|{name}与你分享了今天。|{name}님이 오늘을 나누어 주었어요.
{name}からの日記|A diary from {name}|Un journal de {name}|来自{name}的日记|{name}님에게서 온 일기
{name}に送る日記|A diary to {name}|Un journal pour {name}|寄给{name}的日记|{name}님에게 보내는 일기
どこかの誰かが今日を分けてくれました。|Someone, somewhere, shared a little of their day.|Quelqu'un, quelque part, partage un peu de sa journée.|远方的某个人，与你分享了今天。|어딘가의 누군가가 오늘을 나누어 주었어요.
あなた宛てのお便りです。|A letter for you.|Une lettre pour vous.|有一封给你的信。|당신에게 온 편지예요.
封筒をタップすると、日記がひらきます。|Tap the envelope to reveal the diary.|Touchez l'enveloppe pour découvrir le journal.|轻点信封，即可打开日记。|봉투를 누르면 일기가 열려요.
まだ開けていないお便り|An unopened letter|Une lettre à découvrir|尚未拆开的来信|아직 열지 않은 편지
タップして封筒を開く|Tap to open the envelope|Touchez pour ouvrir l'enveloppe|轻点打开信封|눌러서 봉투 열기
ステッカーを移動|Move sticker|Déplacer l'autocollant|移动贴纸|스티커 이동
ドラッグまたは矢印キーで移動|Drag or use arrow keys to move|Déplacez avec la souris ou les flèches|拖动或使用方向键移动|드래그하거나 방향키로 이동
ステッカーの配置|Sticker placement|Placement de l'autocollant|贴纸位置|스티커 배치
ステッカーをドラッグして好きな場所へ。矢印キーでも動かせます。|Drag the sticker anywhere on the paper. Arrow keys work too.|Glissez l'autocollant sur le papier. Les flèches fonctionnent aussi.|将贴纸拖到信纸上的任意位置，也可以使用方向键移动。|스티커를 원하는 곳으로 드래그하세요. 방향키로도 움직일 수 있어요.
横の位置|Horizontal position|Position horizontale|水平位置|가로 위치
縦の位置|Vertical position|Position verticale|垂直位置|세로 위치
回転|Rotation|Rotation|旋转|회전
サイズ|Size|Taille|大小|크기
配置をリセット|Reset placement|Réinitialiser la position|重置位置|배치 초기화
ステッカーを外す|Remove sticker|Retirer l'autocollant|移除贴纸|스티커 떼기
ステッカーの配置を確認してください。|Please check the sticker placement.|Vérifiez la position de l'autocollant.|请检查贴纸的位置。|스티커 배치를 확인해 주세요.
帰り道、いつも通り過ぎる花屋さんで、小さな花束を買いました。\n\n誰かのためじゃなく、自分のために。\nそれだけで、いつもの部屋が少し違って見えました。\n\nあなたにも、今日ひとつ、小さなうれしいことがありますように。|On my way home, I bought a little bouquet at the florist I always walk past.\n\nNot for someone else. For me.\nThat alone made my familiar room look a little different.\n\nI hope you find a small moment of happiness today, too.|Sur le chemin du retour, j'ai acheté un petit bouquet chez le fleuriste devant lequel je passe toujours.\n\nPas pour quelqu'un d'autre. Pour moi.\nCela a suffi pour que ma chambre me semble un peu différente.\n\nJ'espère que vous trouverez aussi un petit bonheur aujourd'hui.|回家的路上，我在平时总是路过的花店买了一小束花。\n\n不是为别人，是为自己。\n仅仅这样，熟悉的房间就变得有一点不同。\n\n希望今天，你也能遇到一件小小的开心事。|집에 오는 길에 늘 지나치던 꽃집에서 작은 꽃다발을 샀어요.\n\n누군가를 위해서가 아니라, 나를 위해서.\n그것만으로 늘 보던 방이 조금 달라 보였어요.\n\n당신에게도 오늘 작은 기쁨 하나가 찾아오길 바라요.
表示言語の設定も、このブラウザーに保存します。|Your display language preference is also saved in this browser.|Votre langue d'affichage est aussi enregistrée dans ce navigateur.|显示语言设置也会保存在此浏览器中。|표시 언어 설정도 이 브라우저에 저장합니다.
晴れやか|Sunny|Rayonnant|晴朗|맑음
おだやか|Peaceful|Paisible|平静|평온
もやもや|Cloudy inside|L'esprit brumeux|心里有点乱|뒤숭숭
しょんぼり|Feeling low|Un peu triste|低落|시무룩
ひとやすみ|Taking a break|Petite pause|休息一下|잠깐 쉬기
確認中|Checking…|Vérification…|确认中…|확인 중…
今日|Today|Aujourd'hui|今天|오늘
ことのは ホーム|Kotonoha home|Accueil Kotonoha|Kotonoha 首页|코토노하 홈
ことのは|Kotonoha|Kotonoha|Kotonoha|코토노하
ことばを運ぶ。ついでに、ぬくもりも。|Delivering words. And a little warmth.|Des mots livrés avec un peu de chaleur.|传递文字，也捎上一点温暖。|말을 전해요. 온기도 살짝 담아서.
ログイン状態を保存中|Signed in on this browser|Connexion conservée|已保持登录|로그인 유지 중
ログアウト|Sign out|Se déconnecter|退出登录|로그아웃
匿名でつながる|Connect anonymously|Un lien anonyme|匿名相连|익명으로 연결
今日の日記|Today's diary|Journal du jour|今天的日记|오늘의 일기
交換日記帳|Diary mailbox|Carnet d'échanges|交换日记本|교환 일기장
コレクション|Collection|Collection|收藏|컬렉션
小さなコレクション|Little collection|Petite collection|小小收藏|작은 컬렉션
上手に書くの、|Perfect writing?|Bien écrire ?|不必写得完美，|잘 쓰려는 마음은,
お休みしませんか。|Give it a day off.|Faites une pause.|今天先放个假吧。|잠깐 쉬어도 괜찮아요.
「お昼がおいしかった」も、|“Lunch was good”|« Le déjeuner était bon »|“午饭很好吃”，|“점심이 맛있었다”도,
ちゃんと立派な一日です。|is a perfectly good day.|C'est déjà une belle journée.|也是很棒的一天。|충분히 멋진 하루예요.
名文不要。誤字に寛大。|No masterpieces needed. Typos welcome.|Pas de chef-d'œuvre requis. Coquilles admises.|不求佳作，错字也没关系。|명문은 필요 없어요. 오타도 환영.
安心して使うために|Staying safe|Pour votre tranquillité|安心使用|안전하게 이용하기
再読み込み|Reload|Recharger|重新加载|새로고침
01 / 今日のひとこと便|01 / A little note for today|01 / Le petit mot du jour|01 / 今天的小小心意|01 / 오늘의 한마디 편지
今日のきもち、|Your feelings today,|Vos émotions du jour,|今天的心情，|오늘의 마음,
おあずかりします。|in good paws.|entre de bonnes pattes.|交给我保管吧。|잘 맡아둘게요.
大事件も、おやつの話も。名も知らない誰かへ、1日1通。|Big news or little snacks. One diary a day, to someone you haven't met.|Grande nouvelle ou petit goûter. Un journal par jour, pour un inconnu.|大事也好，零食也好。每天一封，写给不知姓名的某个人。|큰일도, 간식 이야기도. 이름 모를 누군가에게 하루 한 통.
読み込み中|Loading…|Chargement…|加载中…|불러오는 중…
本日、1通受付中|One letter welcome today|Une lettre pour aujourd'hui|今天可投递一封|오늘 한 통 접수 중
本日の受付、おしまい|Closed for today|Guichet fermé pour aujourd'hui|今天已打烊|오늘 접수 마감
今日の気分|Today's mood|Humeur du jour|今天的心情|오늘의 기분
Dear まだ知らない、あなた|Dear someone I haven't met|Cher inconnu|亲爱的陌生人|아직 모르는 당신에게
拝啓、どこかの誰かさん。\n\n今日のわたしは、こんな感じでした。\n（オチはなくても大丈夫。）|Dear someone, somewhere.\n\nHere's what my day felt like.\n(No punchline required.)|Cher inconnu, quelque part.\n\nVoici à quoi ressemblait ma journée.\n(Pas besoin d'une chute.)|亲爱的、远方的某个人：\n\n今天的我是这样的。\n（没有精彩结尾也没关系。）|어딘가의 누군가에게.\n\n오늘의 저는 이런 하루를 보냈어요.\n(멋진 결말은 없어도 괜찮아요.)
便箋・ステッカー|Paper & stickers|Papier et autocollants|信纸与贴纸|편지지 · 스티커
IPから自動判定|Detected from IP|Détection par IP|根据 IP 自动识别|IP로 자동 감지
日記の書体|Diary font|Police du journal|日记字体|일기 글꼴
日記のフォント|Diary font|Police du journal|日记字体|일기 글꼴
相手にも、この書体で届きます。|Your reader sees this font too.|Votre destinataire verra aussi cette police.|对方也会看到这个字体。|받는 사람에게도 이 글꼴로 보여요.
本名・住所・連絡先は書かないでください。|Please leave out real names, addresses and contact details.|N'indiquez ni nom réel, ni adresse, ni coordonnées.|请勿填写真实姓名、地址或联系方式。|실명, 주소, 연락처는 쓰지 마세요.
少し時間をかけて、誰かのもとへ。|A little journey to someone, somewhere.|Un petit voyage vers quelqu'un.|慢慢出发，送到某个人手中。|조금 천천히, 누군가에게.
日記を預けています…|Posting your diary…|Envoi du journal…|正在投递日记…|일기를 맡기는 중…
このきもちを、投函する|Post these feelings|Poster ces émotions|投递这份心情|이 마음을 부치기
本日は閉店。また明日。|Closed today. See you tomorrow.|Fermé pour aujourd'hui. À demain.|今天打烊啦，明天见。|오늘은 마감. 내일 만나요.
Googleでログイン|Sign in with Google|Se connecter avec Google|使用 Google 登录|Google로 로그인
ログイン設定を確認中…|Checking sign-in…|Vérification de la connexion…|正在检查登录设置…|로그인 설정 확인 중…
Googleログインは設定準備中|Google sign-in isn't ready yet|Connexion Google en préparation|Google 登录尚未就绪|Google 로그인 준비 중
1〜200文字・1日1通・日本時間の午前0時にリセット|1–200 characters · 1 diary/day · Resets at midnight Japan time (UTC+9)|1 à 200 caractères · 1 journal/jour · Réinitialisation à minuit au Japon (UTC+9)|1～200 字符 · 每天一封 · 日本时间（UTC+9）午夜重置|1~200자 · 하루 한 통 · 일본 시간(UTC+9) 자정에 초기화
／ 下書きはこの端末に保存されます。ログイン後は、このブラウザーで状態を保持します。|/ Drafts stay on this device. This browser keeps you signed in.|/ Brouillons conservés sur cet appareil. Ce navigateur garde votre connexion.|/ 草稿保存在此设备。登录后将在此浏览器保持登录。|/ 초안은 이 기기에 저장됩니다. 로그인 후 이 브라우저에서 상태를 유지합니다.
まだ見ぬ誰かの、|Someone you haven't met,|Quelqu'un que vous ne connaissez pas,|未曾谋面的某个人，|아직 만나지 못한 누군가의,
なんでもない一日。|an ordinary little day.|une journée toute simple.|平凡的一天。|평범한 하루.
日記をひとつ送ると、|Send a little of your day,|Envoyez un peu de votre journée,|寄出一篇日记，|일기 한 통을 보내면,
世界のどこかの一日が届きます。|receive a day from somewhere in the world.|recevez celle de quelqu'un, quelque part.|就会收到世界某处的一天。|세계 어딘가의 하루가 도착해요.
次のお便りをお届け待ち|Waiting for the next letter|En attente de la prochaine lettre|等待下一封来信|다음 편지를 기다리는 중
あなたの1通から、はじまります|It starts with your first letter|Tout commence par votre lettre|从你的一封信开始|당신의 한 통으로 시작해요
届いた日記を読む|Read a received diary|Lire le journal reçu|阅读收到的日记|받은 일기 읽기
1日1回の贈りもの|One daily gift|Un cadeau par jour|每天一份礼物|하루 한 번 선물
中身は、猫にもひみつ。|Even the cat doesn't know what's inside.|Même le chat ignore ce qu'il y a dedans.|里面是什么，连猫也不知道。|내용물은 고양이에게도 비밀.
1日1回、机の引き出しに小さな贈りもの。|A little surprise in your drawer, once a day.|Une petite surprise dans votre tiroir, chaque jour.|每天一次，抽屉里藏着一份小礼物。|하루 한 번, 서랍 속 작은 선물.
贈りものを開ける|Open your gift|Ouvrir le cadeau|打开礼物|선물 열기
もう少し、書きたい日は|For days with more to say|Les jours où vous avez plus à dire|想多写一点的日子|조금 더 쓰고 싶은 날엔
広告を見て、もう1通 · 準備中|An ad for an extra letter · Coming soon|Une pub pour une lettre de plus · À venir|看广告，再寄一封 · 筹备中|광고 보고 한 통 더 · 준비 중
こんなお便りが届きます|A peek inside the mailbox|Un aperçu de la boîte aux lettres|你可能收到这样的来信|이런 편지가 도착해요
架空の日記の見本|Fictional sample diary|Exemple de journal fictif|虚构日记示例|가상의 일기 예시
「誰かのためじゃなく、自分のために。」|“Not for someone else. For me.”|« Pas pour quelqu'un d'autre. Pour moi. »|“不是为别人，是为自己。”|“누군가를 위해서가 아니라, 나를 위해서.”
フランスの誰かさんから|From someone in France|De quelqu'un en France|来自法国的某个人|프랑스의 누군가로부터
誰かの「なんでもない」が、あなたの宝物になる。|Someone's ordinary day becomes your little treasure.|Une journée ordinaire devient votre petit trésor.|某个人的平凡日常，成为你的珍藏。|누군가의 평범한 하루가 당신의 보물이 돼요.
届いた日記|Received|Reçus|收到的日记|받은 일기
送った日記|Sent|Envoyés|寄出的日记|보낸 일기
お届け済み|Delivered|Livré|已送达|배달 완료
お届け待ち|Awaiting delivery|En attente de livraison|等待送达|배달 대기
日記をひらく|Open diary|Ouvrir le journal|打开日记|일기 열기
まだ白紙。のびしろしかない。|A blank page. All possibility.|Page blanche. Tout reste à écrire.|还是空白，充满可能。|아직 빈 페이지. 가능성은 무한대.
あなたの言葉を、最初の1ページに。|Your words on the very first page.|Vos mots sur la toute première page.|用你的话，写下第一页。|당신의 말로 첫 페이지를 채워요.
日記を書くと、誰かのお便りを待つことができます。|Write a diary to start waiting for a letter.|Écrivez un journal pour recevoir une lettre.|写一篇日记，就可以等待某个人的来信。|일기를 쓰면 누군가의 편지를 기다릴 수 있어요.
短い日記でも大丈夫。今日の気持ちを残してみませんか。|A short note is enough. How did today feel?|Quelques mots suffisent. Comment était votre journée ?|短短几句也可以。记下今天的心情吧。|짧아도 괜찮아요. 오늘의 마음을 남겨볼까요?
今日の日記を書く|Write today's diary|Écrire le journal du jour|写今天的日记|오늘의 일기 쓰기
見本の日記を読んでみる|Read a sample diary|Lire un exemple|阅读示例日记|예시 일기 읽기
役には立たないかも。でも、ちょっとうれしい。|Maybe not useful. Definitely a little joyful.|Pas forcément utile. Mais un petit bonheur.|也许没什么用，但会有点开心。|쓸모는 몰라도, 조금은 행복해요.
種類|types|types|种|종류
今日の、ちいさな運だめし。|A tiny bit of luck for today.|Une petite chance pour aujourd'hui.|今天的小小幸运。|오늘의 작은 행운 뽑기.
無料で1日1回。ステッカーや便箋が、ランダムでひとつ。|Free, once a day. One random sticker or paper.|Une fois par jour, gratuitement. Un autocollant ou un papier au hasard.|每天免费一次，随机获得一张贴纸或一种信纸。|하루 한 번 무료. 스티커나 편지지를 무작위로 하나.
今日は受け取り済み|Today's gift collected|Cadeau du jour reçu|今天已领取|오늘은 이미 받았어요
Googleでログインすると贈りものを受け取り、コレクションに保存できます。|Sign in with Google to receive gifts and save your collection.|Connectez-vous avec Google pour recevoir des cadeaux et conserver votre collection.|使用 Google 登录即可领取礼物并保存收藏。|Google로 로그인하면 선물을 받고 컬렉션에 저장할 수 있어요.
ステッカーと便箋|Stickers & paper|Autocollants et papiers|贴纸与信纸|스티커와 편지지
手に入れたものは日記に添えられます|Add your finds to a diary|Ajoutez vos trouvailles à un journal|可以把获得的物品用在日记上|모은 아이템을 일기에 넣어 보세요
行動のごほうび|A little reward|Petite récompense|行动奖励|행동으로 얻는 선물
まだ出会っていません|Not discovered yet|Pas encore découvert|尚未发现|아직 만나지 못했어요
一日ひとつ、やさしいつながり。|One gentle connection a day.|Un doux lien chaque jour.|每天一份温柔的联结。|하루 하나, 다정한 연결.
フランスからのお便り · 見本|A letter from France · Sample|Une lettre de France · Exemple|法国来信 · 示例|프랑스에서 온 편지 · 예시
あなたの今日を、預かりました。|Your day is in good paws.|Votre journée est entre de bonnes pattes.|你的今天，已妥善收好。|당신의 오늘을 잘 맡았어요.
安心して、心を交換するために|A safe place to share your heart|Partager son cœur en toute tranquillité|安心交换心情|안심하고 마음을 나누기 위해
もう1通の交換について|About an extra diary|À propos du journal supplémentaire|关于额外的一封日记|한 통 더 교환하기
日記に、小さな彩りを。|A little color for your diary.|Une touche de couleur pour votre journal.|给日记添一点色彩。|일기에 작은 색을 더해요.
今日、出会った贈りもの。|Today's little discovery.|La petite découverte du jour.|今天遇见的小礼物。|오늘 만난 선물.
この日記を通報する|Report this diary|Signaler ce journal|举报这篇日记|이 일기 신고하기
この相手をブロックする|Block this person|Bloquer cette personne|屏蔽此人|이 상대 차단하기
返信のかわりに、ひとつの気持ちを。|One feeling, instead of a reply.|Une émotion en guise de réponse.|用一份心意，代替回复。|답장 대신 마음 하나를.
日記は保存されています。同じ日に投函した相手が見つかり次第、お便りが届きます。|Your diary is saved. A letter will arrive when someone who posted on the same day is found.|Votre journal est enregistré. Une lettre arrivera lorsqu'une personne ayant écrit le même jour sera trouvée.|日记已保存。找到同一天投递的伙伴后，你就会收到来信。|일기가 저장됐어요. 같은 날 보낸 상대를 찾으면 편지가 도착해요.
あなたのペースで、楽しんでください。|Enjoy it at your own pace.|Profitez-en à votre rythme.|按照自己的节奏享受吧。|당신의 속도로 즐겨주세요.
自動翻訳は準備中です。現在は原文を表示しています。|Automatic translation is coming later. This is the original text.|La traduction automatique est en préparation. Le texte original est affiché.|自动翻译尚在筹备中，目前显示原文。|자동 번역은 준비 중이에요. 지금은 원문을 표시합니다.
日本語で読む|Read in your language|Lire dans votre langue|用所选语言阅读|선택한 언어로 읽기
原文を見る|View original|Voir l'original|查看原文|원문 보기
翻訳 · 準備中|Translation · Coming soon|Traduction · À venir|翻译 · 筹备中|번역 · 준비 중
共感しました|I relate|Je comprends|我也有同感|공감해요
ありがとう|Thank you|Merci|谢谢|고마워요
そっとハグ|A gentle hug|Un câlin tout doux|轻轻拥抱|살짝 안아줄게요
すてき|Lovely|C'est beau|真好|멋져요
見本へのリアクションは保存・送信されません。|Sample reactions aren't saved or sent.|Les réactions à l'exemple ne sont ni enregistrées ni envoyées.|对示例的反应不会保存或发送。|예시에 남긴 반응은 저장하거나 전송하지 않아요.
気持ちを届けました。|Your feeling was delivered.|Votre émotion a été transmise.|心意已送达。|마음을 전했어요.
ひとつだけ、気持ちを届ける|Send one little feeling|Envoyer une petite émotion|送出一份心意|마음 하나를 전해요
通報する|Report|Signaler|举报|신고하기
ブロック|Block|Bloquer|屏蔽|차단
日記を抱えるぽすと|Posto carrying a diary|Posto portant un journal|抱着日记的波斯托|일기를 안고 있는 포스토
ぽすとが、大事そうに抱えています。|Posto is holding it very carefully.|Posto le tient très précieusement.|波斯托正小心翼翼地抱着它。|포스토가 소중하게 안고 있어요.
また日記帳をのぞいてみてください。|Peek into your mailbox again later.|Revenez jeter un œil au carnet.|稍后再来看看日记本吧。|나중에 일기장을 다시 들여다보세요.
交換日記帳へ|Go to your mailbox|Ouvrir le carnet|前往交换日记本|교환 일기장으로
名前のかわりに、国・地域だけ。|Only your country or region, never your name.|Votre pays ou région, pas votre nom.|只显示国家或地区，不显示姓名。|이름 대신 국가 · 지역만.
相手にアカウント情報は表示されません。投稿時のIPアドレスから国・地域を自動判定します。VPNなどの利用時は接続先の国になる場合があり、判定できないときは「どこか」と表示します。|Your account details are hidden. Country or region is detected from your IP when posting. A VPN may show its location. If detection fails, we show “Somewhere”.|Vos informations de compte restent privées. Le pays ou la région est détecté via votre IP lors de l'envoi. Un VPN peut modifier ce résultat. En cas d'échec, nous affichons « Quelque part ».|账号信息不会向对方显示。投递时根据 IP 自动识别国家或地区。使用 VPN 时可能显示连接所在地，无法识别时显示“某处”。|계정 정보는 상대에게 표시되지 않아요. 보낼 때 IP로 국가나 지역을 확인합니다. VPN을 쓰면 접속 국가가 표시될 수 있고, 확인할 수 없으면 ‘어딘가’로 표시해요.
自分と相手のプライバシーを大切に。|Protect your privacy and theirs.|Respectez votre vie privée et celle des autres.|珍惜自己和他人的隐私。|서로의 개인정보를 소중히.
本名、住所、連絡先、SNSのIDは書かないでください。送信時にルールによる自動チェックを行いますが、すべてを検出できるわけではありません。|Don't include real names, addresses, contact details or social handles. Rule-based checks run on submission, but cannot detect every problem.|N'indiquez ni nom réel, ni adresse, ni coordonnées, ni identifiants sociaux. Les contrôles automatiques à l'envoi ne détectent pas tous les problèmes.|请勿填写真实姓名、地址、联系方式或社交账号。发送时会进行规则检测，但无法发现所有问题。|실명, 주소, 연락처, SNS ID는 쓰지 마세요. 보낼 때 규칙 기반 자동 검사를 하지만 모든 문제를 발견할 수는 없어요.
つらい内容は、受け取らなくて大丈夫。|You don't have to keep hurtful content.|Vous n'avez pas à garder un contenu blessant.|难受的内容，不必勉强接受。|힘든 내용은 참지 않아도 돼요.
届いた日記から通報・ブロックできます。通報された日記は非表示になり、記録が保存されます。|Report or block from a received diary. Reported diaries are hidden and the report is saved.|Vous pouvez signaler ou bloquer depuis un journal reçu. Le journal signalé est masqué et le signalement enregistré.|可以从收到的日记中举报或屏蔽。被举报的日记会隐藏，举报记录会保存。|받은 일기에서 신고하거나 차단할 수 있어요. 신고된 일기는 숨겨지고 기록이 저장돼요.
1日1通の、ゆっくりしたやりとり。|One diary a day, at a gentle pace.|Un journal par jour, tout doucement.|每天一封，慢慢交流。|하루 한 통, 느긋한 교환.
日本時間の午前0時にリセット。返信機能はありません。同じ日（日本時間）に投函された日記同士で交換します。相手がいないときは日記を預かり、お届けを待ちます。|Resets at midnight Japan time (UTC+9). There are no replies. Diaries are exchanged only with others posted on the same Japan-calendar day. If no match is found, your diary waits.|Réinitialisation à minuit au Japon (UTC+9). Pas de réponses. Seuls les journaux envoyés le même jour au Japon sont échangés. Sans partenaire, votre journal reste en attente.|日本时间（UTC+9）午夜重置。没有回复功能。仅交换日本时间同一天投递的日记，没有伙伴时会保管日记等待投递。|일본 시간(UTC+9) 자정에 초기화해요. 답장은 없어요. 일본 시간으로 같은 날 보낸 일기끼리만 교환해요. 상대가 없으면 일기를 맡아두고 기다립니다.
広告を最後まで見ると、その日だけ追加で1通書ける機能を準備しています。|We're preparing a way to watch an ad and write one extra diary that day.|Une fonction permettant de regarder une publicité pour écrire un journal supplémentaire est en préparation.|正在筹备看完广告后，当天可额外写一封日记的功能。|광고를 끝까지 보면 그날 한 통 더 쓸 수 있는 기능을 준비하고 있어요.
現在は広告サービス未接続のため利用できません。通常の日記交換と無料の贈りものは、そのまま楽しめます。|This isn't available yet because ads aren't connected. Regular exchanges and free gifts are available.|Ce service n'est pas encore disponible. Les échanges habituels et les cadeaux gratuits restent accessibles.|目前尚未接入广告服务，暂时无法使用。正常日记交换和免费礼物不受影响。|광고 서비스가 연결되지 않아 아직 이용할 수 없어요. 일반 일기 교환과 무료 선물은 즐길 수 있어요.
便箋|Letter paper|Papier à lettres|信纸|편지지
いつもの便箋|Everyday paper|Papier habituel|日常信纸|기본 편지지
空色|Sky blue|Bleu ciel|天蓝色|하늘색
桃色|Peach pink|Rose pêche|桃粉色|분홍색
ステッカー|Stickers|Autocollants|贴纸|스티커
なし|None|Aucun|无|없음
ステッカーは投函が成功すると1枚消費します。便箋は繰り返し使えます。新しいアイテムは「小さなコレクション」で受け取れます。|A successful post uses one sticker. Paper is reusable. Find new items in Little collection.|Un envoi réussi utilise un autocollant. Le papier est réutilisable. Retrouvez de nouveaux objets dans Petite collection.|投递成功会消耗一张贴纸。信纸可重复使用。可以在“小小收藏”中获取新物品。|투함에 성공하면 스티커 한 장을 사용해요. 편지지는 계속 쓸 수 있어요. 새 아이템은 작은 컬렉션에서 받을 수 있어요.
これにする|Use these|Choisir|就选这个|이걸로 할게요
新しいステッカー|A new sticker|Un nouvel autocollant|新贴纸|새 스티커
コレクションに保存しました。日記に添えてみましょう。|Saved to your collection. Add it to a diary.|Ajouté à votre collection. Glissez-le dans un journal.|已加入收藏，试着用在日记上吧。|컬렉션에 저장했어요. 일기에 넣어 보세요.
今日の日記に使う|Use in today's diary|Utiliser aujourd'hui|用于今天的日记|오늘 일기에 쓰기
通報理由|Reason for report|Motif du signalement|举报原因|신고 사유
個人情報|Personal information|Informations personnelles|个人信息|개인정보
攻撃的な内容|Abusive content|Contenu agressif|攻击性内容|공격적인 내용
不適切な内容|Inappropriate content|Contenu inapproprié|不当内容|부적절한 내용
その他|Other|Autre|其他|기타
この日記は非表示になり、通報内容が保存されます。|This diary will be hidden and your report saved.|Ce journal sera masqué et votre signalement enregistré.|此日记将被隐藏，举报内容将保存。|이 일기는 숨겨지고 신고 내용이 저장돼요.
通報して非表示にする|Report and hide|Signaler et masquer|举报并隐藏|신고하고 숨기기
この相手の日記を非表示にし、今後の交換対象から外します。|Hide this person's diaries and exclude them from future exchanges.|Masquer les journaux de cette personne et l'exclure des futurs échanges.|隐藏此人的日记，并不再与其交换。|이 상대의 일기를 숨기고 앞으로 교환 대상에서 제외해요.
ブロックする|Block this person|Bloquer cette personne|屏蔽此人|차단하기
はい。猫の手、空いてます。|Yes. These paws are available.|Oui. Mes pattes sont disponibles.|是的，猫爪现在有空。|네. 고양이 손, 비어 있어요.
なでても配達速度は変わりません。|Petting won't speed up delivery.|Les caresses n'accélèrent pas la livraison.|摸摸也不会加快配送哦。|쓰다듬어도 배달 속도는 그대로예요.
……もう一回だけなら。|…Well, just one more.|…Bon, encore une seule fois.|……再摸一次的话，可以。|……한 번만 더라면.
仕事中です。いちおう。|I'm working. Technically.|Je travaille. En principe.|正在工作。大概吧。|일하는 중이에요. 일단은요.
今日もおつかれさま。|You did enough today.|Bravo pour cette journée.|今天也辛苦啦。|오늘도 수고했어요.
勤務中のまばたきが、ちょっと長め。|Just a very long blink on the job.|Juste un très long clignement d'yeux au travail.|只是工作时眨眼眨得有点久。|근무 중 눈 깜빡임이 조금 길 뿐이에요.
「ねこ」って書いた？ 呼びました？|Did you write “cat”? You called?|Vous avez écrit « chat » ? On m'appelle ?|你写了“猫”？叫我了吗？|“고양이”라고 썼어요? 부르셨어요?
大作ですね。両手で運びます。|A masterpiece! I'll use both paws.|Un chef-d'œuvre ! Je prends mes deux pattes.|大作呢，要用两只爪子搬。|대작이네요. 두 손으로 나를게요.
うんうん。ちゃんと、預かるよ。|Mm-hmm. I'll keep it safe.|Oui, oui. Je le garde précieusement.|嗯嗯，我会好好保管的。|응응. 잘 맡아둘게요.
雨の日は、ここで雨宿り。|Shelter here on rainy days.|Abritez-vous ici les jours de pluie.|下雨的日子，就在这里躲躲雨。|비 오는 날엔 여기서 쉬어 가요.
今日は省エネ。それも立派な一日。|Energy-saving mode today. Still a good day.|Mode économie d'énergie. Une belle journée quand même.|今天是省电模式，也是很棒的一天。|오늘은 절전 모드. 그것도 멋진 하루예요.
白紙もいいけど、お話も聞きたい。|Blank pages are nice. Stories are nicer.|Une page blanche, c'est bien. Une histoire aussi.|空白也不错，但更想听你说说话。|빈 종이도 좋지만 이야기도 듣고 싶어요.
配達係ぽすとの部屋|Posto's post office|Le bureau de Posto|邮递员波斯托的小屋|배달원 포스토의 방
休憩中 zZ|On a break zZ|En pause zZ|休息中 zZ|쉬는 중 zZ
勤務中（たぶん）|On duty (probably)|Au travail (sans doute)|工作中（大概）|근무 중(아마도)
きもちの配達、|Delivering feelings,|Livraison d'émotions,|传递心情，|마음 배달은,
猫の手も借りて。|with a helping paw.|avec un coup de patte.|猫爪也来帮忙。|고양이 손도 빌려요.
配達係ぽすとをなでる|Pet Posto the mail cat|Caresser Posto le chat facteur|摸摸邮递猫波斯托|배달 고양이 포스토 쓰다듬기
なでてみる？|Fancy a pet?|Une caresse ?|摸摸看？|쓰다듬어 볼래요?
目を閉じて丸くなり、手紙を枕に眠るぽすと|Posto curled up asleep on a letter|Posto endormi en boule sur une lettre|蜷起身子枕着信睡觉的波斯托|편지를 베고 웅크려 자는 포스토
うれしそうに目を細め、前足を上げるぽすと|Posto smiling and raising a paw|Posto souriant, une patte levée|眯眼微笑、举起爪子的波斯托|웃으며 앞발을 든 포스토
片耳が折れた、とぼけ顔の黒猫の配達係ぽすと|Posto, a goofy black mail cat with one folded ear|Posto, chat facteur noir à l'air drôle et à l'oreille pliée|一只耳朵折着、表情呆萌的黑猫邮递员波斯托|한쪽 귀가 접힌 엉뚱한 검은 배달 고양이 포스토
ぽすと|Posto|Posto|波斯托|포스토
特技：大事そうに運ぶ|Skill: looking very careful|Talent : porter avec grand soin|特长：看起来很小心地搬运|특기: 소중한 척 나르기
なでる？ ↗|Pet me? ↗|Une caresse ? ↗|摸摸？ ↗|쓰다듬을래요? ↗
✦ 名誉なで係の会員証|✦ Honorary petter card|✦ Carte de caresseur honoraire|✦ 荣誉摸摸员会员证|✦ 명예 쓰담 담당 회원증
あ、見つかっちゃった。|Oh. You found me.|Oh. Vous m'avez trouvé.|啊，被发现啦。|앗, 들켰네요.
ぽすとから、あなたへ。|From Posto, to you.|De Posto, pour vous.|波斯托送给你。|포스토가 당신에게.
ことのは郵便局 非公式|Unofficial Kotonoha Post Office|Poste Kotonoha, non officiel|Kotonoha 邮局 · 非官方|코토노하 우체국 비공식
名誉なで係|Honorary petter|Caresseur honoraire|荣誉摸摸员|명예 쓰담 담당
笑顔で前足を上げる会員証のぽすと|Posto smiling on your membership card|Posto souriant sur votre carte|会员证上微笑举爪的波斯托|회원증 속 웃으며 앞발을 든 포스토
お給料：猫からの信頼。|Salary: a cat's trust.|Salaire : la confiance d'un chat.|薪水：猫的信任。|급여: 고양이의 신뢰.
勤務時間：気が向いたとき。|Hours: whenever you feel like it.|Horaires : quand l'envie vous prend.|工时：心血来潮的时候。|근무 시간: 내킬 때.
称号は小さなコレクションの台帳に保存されています。|Your title is saved in Little collection.|Votre titre est conservé dans Petite collection.|称号已保存在“小小收藏”中。|칭호는 작은 컬렉션에 저장되어 있어요.
ログインすると、なでた回数と称号をアカウントに保存できます。|Sign in to save your pets and titles to your account.|Connectez-vous pour conserver vos caresses et vos titres.|登录后可将摸摸次数和称号保存到账号。|로그인하면 쓰다듬은 횟수와 칭호를 계정에 저장할 수 있어요.
獲得した称号|Earned titles|Titres obtenus|已获得的称号|획득한 칭호
件|earned|obtenus|个|개
ログインすると、あなたの称号を確認できます。|Sign in to see your titles.|Connectez-vous pour voir vos titres.|登录后可以查看你的称号。|로그인하면 칭호를 확인할 수 있어요.
まだ称号はありません。あなたのペースで楽しんでください。|No titles yet. Enjoy things at your own pace.|Pas encore de titre. Profitez-en à votre rythme.|还没有称号，按照自己的节奏享受吧。|아직 칭호가 없어요. 당신의 속도로 즐겨주세요.
獲得：|Earned: |Obtenu : |获得于：|획득: 
ぽすとが日記帳を運んでいます。|Posto is bringing your diary.|Posto apporte votre carnet.|波斯托正在搬运日记本。|포스토가 일기장을 나르고 있어요.
よいしょ、よいしょ。|One paw at a time.|Une patte après l'autre.|嘿咻，嘿咻。|영차, 영차.
404 / 配達先が見つかりません|404 / Address not found|404 / Adresse introuvable|404 / 找不到收件地址|404 / 배달 주소를 찾을 수 없어요
頭を下げて謝る配達係ぽすと|Posto bowing in apology|Posto s'incline pour s'excuser|低头道歉的波斯托|고개 숙여 사과하는 포스토
すみません。|Sorry about that.|Pardon.|对不起。|죄송해요.
猫の地図、逆さまでした。|The cat's map was upside down.|Le chat tenait sa carte à l'envers.|猫把地图拿反了。|고양이가 지도를 거꾸로 들었어요.
このページは見つかりませんでした。|We couldn't find this page.|Cette page est introuvable.|找不到这个页面。|이 페이지를 찾지 못했어요.
日記帳は、ちゃんと郵便局にあります。|Your diary is safe at the post office.|Votre carnet est bien à la poste.|日记本好好地放在邮局里。|일기장은 우체국에 잘 있어요.
郵便局に帰る →|Back to the post office →|Retour à la poste →|回到邮局 →|우체국으로 돌아가기 →
ぽすと「次は、たぶん大丈夫です。」|Posto: “Next time. Probably.”|Posto : « La prochaine fois, sans doute. »|波斯托：“下次应该没问题。”|포스토: “다음엔 아마 괜찮을 거예요.”
いつもの丸ゴシック|Everyday sans serif|Sans empattement|日常无衬线|기본 고딕체
お手紙の明朝体|Letter serif|Avec empattements|书信衬线体|편지 명조체
タイプライター|Typewriter|Machine à écrire|打字机|타자기
チューリップ|Tulip|Tulipe|郁金香|튤립
小さなレモン|Little lemon|Petit citron|小柠檬|작은 레몬
おさんぽねこ|Strolling cat|Chat en balade|散步猫|산책 고양이
青いちょうちょ|Blue butterfly|Papillon bleu|蓝蝴蝶|파란 나비
ひまわり|Sunflower|Tournesol|向日葵|해바라기
さくらんぼ|Cherries|Cerises|樱桃|체리
ぷるぷるプリン|Wobbly pudding|Flan tremblotant|晃悠悠布丁|탱글탱글 푸딩
穴までおいしい|Delicious, hole and all|Délicieux jusqu'au trou|连洞都好吃|구멍까지 맛있어
寝ぐせクロワッサン|Bedhead croissant|Croissant ébouriffé|睡乱发型的可颂|잠버릇 크루아상
おにぎり休憩|Rice ball break|Pause onigiri|饭团休息时间|주먹밥 휴식
ひと息コーヒー|Coffee breather|Pause café|歇口气咖啡|한숨 돌리는 커피
お茶にしましょう|Time for tea|Prenons un thé|来喝茶吧|차 한 잔 해요
いちごのごきげん|Happy strawberry|Fraise joyeuse|开心草莓|기분 좋은 딸기
きのこの秘密基地|Mushroom hideout|Cachette champignon|蘑菇秘密基地|버섯 비밀 기지
急がない便|Snail mail, literally|Courrier escargot|不着急快递|서두르지 않는 우편
ぺんぎん係長|Penguin supervisor|Chef pingouin|企鹅组长|펭귄 계장
らっこの休日|Otter's day off|Congé de la loutre|海獭的假日|해달의 휴일
くじらのお便り|Whale mail|Courrier de baleine|鲸鱼来信|고래의 편지
雨あがり|After the rain|Après la pluie|雨后|비가 그친 뒤
土星旅行|Trip to Saturn|Voyage vers Saturne|土星旅行|토성 여행
小さな花|Little flower|Petite fleur|小花|작은 꽃
ふわふわ風船|Floaty balloon|Ballon léger|轻飘飘气球|둥실둥실 풍선
空色の便箋|Sky-blue paper|Papier bleu ciel|天蓝色信纸|하늘색 편지지
桃色の便箋|Peach-pink paper|Papier rose pêche|桃粉色信纸|분홍색 편지지
ぽすとの肉球印|Posto's paw stamp|Tampon de Posto|波斯托的爪印|포스토 발바닥 도장
はじめてのお便り|First letter|Première lettre|第一封来信|첫 편지
交換の達人|Exchange expert|Expert des échanges|交换达人|교환의 달인
収集家のリボン|Collector's ribbon|Ruban de collectionneur|收藏家的丝带|수집가의 리본
猫の手も、とろける|Melting paws|Pattes toutes tendres|猫爪也融化了|고양이 손도 사르르
肉球の理解者|Paw whisperer|À l'écoute des coussinets|懂猫爪的人|발바닥을 이해하는 사람
はじめの一筆|The first stroke|Le premier trait|第一笔|첫 한 획
一週間ぶんのあなた|A week of you|Une semaine de vous|一周的你|일주일만큼의 당신
ことばの常連さん|A regular in words|Habitué des mots|文字常客|단골 글손님
はじめましての配達|A first hello|Livraison d'un premier bonjour|初次见面的投递|첫 만남의 배달
十人十色の旅人|Traveler of ten worlds|Voyageur de dix mondes|十色旅人|열 가지 색의 여행자
百通りのこころ|A hundred hearts|Cent cœurs|百种心情|백 가지 마음
引き出しの収集家|Drawer collector|Collectionneur de tiroir|抽屉收藏家|서랍 속 수집가
小さな博物館の館長|Little museum curator|Conservateur du petit musée|小博物馆馆长|작은 박물관 관장
そっと拍手を送る人|A quiet round of applause|Des applaudissements discrets|轻轻鼓掌的人|조용히 박수를 보내는 사람
国境をこえる便り|Letters across borders|Courrier sans frontières|跨越国界的信|국경을 넘는 편지
保存・交換にはログインが必要です。|Sign in to save and exchange diaries.|Connectez-vous pour enregistrer et échanger des journaux.|请登录后保存和交换日记。|저장하고 교환하려면 로그인해 주세요.
保存・交換にはログインしてください。|Please sign in to save and exchange.|Connectez-vous pour enregistrer et échanger.|请登录后保存和交换。|저장하고 교환하려면 로그인해 주세요.
日記帳を読み込めませんでした。少し待って再試行してください。|Couldn't load your diary. Please try again shortly.|Impossible de charger le carnet. Réessayez dans un instant.|无法加载日记本，请稍后重试。|일기장을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
接続できませんでした。下書きはこの画面に残っています。|Couldn't connect. Your draft is still here.|Connexion impossible. Votre brouillon est toujours ici.|无法连接，草稿仍保留在此页面。|연결하지 못했어요. 초안은 이 화면에 남아 있어요.
ログインをキャンセルしました。|Sign-in cancelled.|Connexion annulée.|已取消登录。|로그인을 취소했어요.
ログインの有効時間が切れました。もう一度お試しください。|Sign-in expired. Please try again.|La connexion a expiré. Réessayez.|登录已超时，请重试。|로그인 시간이 만료됐어요. 다시 시도해 주세요.
Googleログインに失敗しました。もう一度お試しください。|Google sign-in failed. Please try again.|Échec de la connexion Google. Réessayez.|Google 登录失败，请重试。|Google 로그인에 실패했어요. 다시 시도해 주세요.
操作元を確認できません。|Couldn't verify the request origin.|Origine de la demande non vérifiable.|无法确认请求来源。|요청 출처를 확인할 수 없어요.
入力が長すぎます。|Your input is too long.|Votre texte est trop long.|输入内容过长。|입력 내용이 너무 길어요.
入力を確認してください。|Please check your input.|Vérifiez votre saisie.|请检查输入内容。|입력 내용을 확인해 주세요.
なで記録を確認できません。|Couldn't verify this pet.|Impossible de vérifier cette caresse.|无法确认摸摸记录。|쓰다듬기 기록을 확인할 수 없어요.
フォントを選んでください。|Please choose a font.|Choisissez une police.|请选择字体。|글꼴을 선택해 주세요.
気分を選んでください。|Please choose a mood.|Choisissez une humeur.|请选择心情。|기분을 선택해 주세요.
持っている便箋とステッカーを選んでください。|Choose paper and stickers you own.|Choisissez du papier et des autocollants en votre possession.|请选择你拥有的信纸和贴纸。|보유한 편지지와 스티커를 선택해 주세요.
今日の交換は完了しています。また明日、待っています。|Today's diary is already sent. See you tomorrow.|Le journal du jour est déjà envoyé. À demain.|今天已完成投递，明天等你。|오늘의 교환은 끝났어요. 내일 기다릴게요.
日記を預かりました。相手が見つかるまで、少しお待ちください。|Your diary is safe. Please wait for a match.|Votre journal est gardé. Patientez jusqu'à trouver un partenaire.|日记已收好，请稍等匹配伙伴。|일기를 맡았어요. 상대를 찾을 때까지 잠시 기다려 주세요.
今日の贈りものが届きました。|Today's gift has arrived.|Le cadeau du jour est arrivé.|今天的礼物到了。|오늘의 선물이 도착했어요.
広告配信は準備中です。視聴完了を確認できるようになると、追加の1通が使えます。|Ads aren't ready yet. Extra diaries will be available when completed views can be verified.|Les publicités sont en préparation. Un journal supplémentaire sera disponible quand le visionnage pourra être vérifié.|广告尚在筹备中，能够验证观看完成后才能额外投稿。|광고는 준비 중이에요. 시청 완료를 확인할 수 있게 되면 한 통 더 쓸 수 있어요.
この日記は操作できません。|This diary isn't available for this action.|Cette action n'est pas disponible pour ce journal.|无法对此日记执行此操作。|이 일기에는 이 작업을 할 수 없어요.
リアクションを選んでください。|Please choose a reaction.|Choisissez une réaction.|请选择一个表情回应。|반응을 선택해 주세요.
通報理由を選んでください。|Please choose a reason.|Choisissez un motif.|请选择举报原因。|신고 사유를 선택해 주세요.
この日記を非表示にしました。|This diary is now hidden.|Ce journal est masqué.|已隐藏此日记。|이 일기를 숨겼어요.
操作を確認してください。|Please check the action.|Vérifiez l'action demandée.|请确认操作。|작업을 확인해 주세요.
このステッカーは使用済みです。別のステッカーを選んでください。|This sticker was already used. Choose another.|Cet autocollant a déjà été utilisé. Choisissez-en un autre.|此贴纸已使用，请选择其他贴纸。|이미 사용한 스티커예요. 다른 스티커를 골라 주세요.
今日の操作はすでに完了しています。画面を更新してください。|This action is already complete today. Reload the page.|Cette action est déjà effectuée aujourd'hui. Rechargez la page.|今天已完成此操作，请刷新页面。|오늘 이미 완료한 작업이에요. 새로고침해 주세요.
保存できませんでした。内容を残したまま再試行できます。|Couldn't save. Your text is kept so you can retry.|Enregistrement impossible. Votre texte est conservé pour réessayer.|保存失败，内容仍保留，可以重试。|저장하지 못했어요. 내용을 유지한 채 다시 시도할 수 있어요.
日記は1〜200文字で書いてください。|Please write 1–200 characters.|Écrivez entre 1 et 200 caractères.|请填写 1～200 个字符。|1~200자로 작성해 주세요.
連絡先・住所・本名につながる情報を取り除いてください。|Remove information that could reveal contact details, addresses or real names.|Retirez les informations révélant des coordonnées, adresses ou noms réels.|请删除涉及联系方式、地址或真实姓名的信息。|연락처, 주소, 실명을 알 수 있는 정보를 지워 주세요.
相手を傷つける表現を見直してください。|Please reconsider words that could hurt someone.|Veuillez revoir les expressions pouvant blesser.|请修改可能伤害他人的表达。|상대에게 상처 줄 수 있는 표현을 고쳐 주세요.
どこか|Somewhere|Quelque part|某处|어딘가
プライバシーポリシー|Privacy policy|Politique de confidentialité|隐私政策|개인정보 처리방침
利用規約|Terms of use|Conditions d'utilisation|使用条款|이용약관
← ことのはに戻る|← Back to Kotonoha|← Retour à Kotonoha|← 返回 Kotonoha|← 코토노하로 돌아가기
紙ひこうきを飛ばす|Fly a paper plane|Faire voler un avion en papier|放飞纸飞机|종이비행기 날리기
ぽすとの空を切り替える|Change Posto’s sky|Changer le ciel de Posto|切换波斯托的天空|포스토의 하늘 바꾸기
毛糸玉で遊ぶ（ドラッグ・矢印キー）|Play with yarn (drag or arrow keys)|Jouer avec la pelote (glisser ou touches fléchées)|玩毛线球（拖动或方向键）|털실 공 놀이 (드래그 또는 방향키)
閉じる|Close|Fermer|关闭|닫기
言語|Language|Langue|语言|언어
所持数 {count} 枚|Owned: {count}|En stock : {count}|持有 {count} 张|보유 {count}장
{country}の誰かさん|Someone in {country}|Une personne · {country}|来自{country}的某个人|{country}의 누군가
From {country}の誰かさん|From someone in {country}|De quelqu'un · {country}|来自{country}的某个人|{country}의 누군가로부터
全{count}種類・各約{chance}% ／ 重複あり。特典ステッカーは行動で獲得。|{count} types · About {chance}% each · Duplicates possible. Bonus stickers are earned through actions.|{count} types · Environ {chance}% chacun · Doublons possibles. Autocollants bonus gagnés par vos actions.|共 {count} 种 · 每种约 {chance}% · 可能重复。额外贴纸通过行动获得。|총 {count}종 · 각 약 {chance}% · 중복 가능. 특별 스티커는 행동으로 획득해요.
写真を選ぶ|Choose a photo|Choisir une photo|选择照片|사진 선택
送信する写真|Photo to send|Photo à envoyer|待发送的照片|보낼 사진
写真を外す|Remove photo|Retirer la photo|移除照片|사진 제거
写真を拡大|Enlarge photo|Agrandir la photo|放大照片|사진 확대
写真|Photo|Photo|照片|사진
写真を確認してください。|Please check the photo.|Veuillez vérifier la photo.|请检查照片。|사진을 확인해 주세요.
タップで開封|Tap to open|Appuyer pour ouvrir|点击拆信|눌러서 열기
全消去|Clear all|Tout effacer|全部清除|모두 지우기
本日|Today|Aujourd’hui|今天|오늘
1通受付中|1 letter welcome|1 lettre disponible|可寄1封信|1통 접수 중
かなしい|Sad|Triste|难过|슬퍼요
笑った|Funny|Drôle|好笑|웃겨요
怒り|Angry|En colère|生气|화나요
ほっこり|Heartwarming|Réconfortant|暖心|따뜻해요
明度|Brightness|Luminosité|明度|명도
言語とアカウント設定|Language and account settings|Langue et compte|语言与账号设置|언어 및 계정 설정
通知履歴|Notifications|Notifications|通知记录|알림 기록
日記の送受信とガチャの受け取り履歴|Diary exchanges and gift history|Journaux échangés et cadeaux reçus|日记收发与礼物领取记录|일기 교환 및 선물 수령 기록
ログインすると通知履歴を確認できます。|Log in to see your notifications.|Connectez-vous pour voir vos notifications.|登录后可查看通知记录。|로그인하면 알림 기록을 볼 수 있어요.
まだ通知はありません。|No notifications yet.|Aucune notification pour le moment.|暂无通知。|아직 알림이 없어요.
日記を投函しました|Diary sent|Journal envoyé|已寄出日记|일기를 보냈어요
日記が届いています|A diary has arrived|Un journal est arrivé|收到了一封日记|일기가 도착했어요
フレンドに日記を投函しました|Diary sent to a friend|Journal envoyé à un ami|已向好友寄出日记|친구에게 일기를 보냈어요
フレンドの日記が届いています|A friend's diary has arrived|Le journal d'un ami est arrivé|收到好友的日记|친구의 일기가 도착했어요
ガチャの贈りものを受け取りました|Gift received|Cadeau reçu|已领取抽选礼物|뽑기 선물을 받았어요
日記の投稿日|Diary posted on|Date du journal|日记投递日期|일기 작성일
便箋|Stationery|Papier à lettres|信纸|편지지
ペンの明度|Pen brightness|Luminosité du stylo|画笔明度|펜 명도
`;
export const messages: Record<string, readonly string[]> = Object.fromEntries(rows.trim().split('\n').map(row=>{const [key,...values]=row.split('|').map(s=>s.replace(/\\n/g,'\n'));return [key,values];}));
Object.assign(messages,legalMessages);
export const locales=['ja','en','fr','zh-CN','ko'] as const;
export type Locale=typeof locales[number];
export function validLocale(value:unknown):value is Locale{return typeof value==='string'&&(locales as readonly string[]).includes(value);}
export function detectLocale(languages:readonly string[]):Locale {for(const language of languages){const base=language.toLowerCase().split('-')[0];if(base==='zh')return 'zh-CN';if(['ja','en','fr','ko'].includes(base))return base as Locale;}return 'en';}
export function translate(source:string,locale:Locale,values:Record<string,string|number>={}):string {
 const key=source.trim();const translated=locale==='ja'?key:messages[key]?.[locales.indexOf(locale)-1]??key;
 const result=translated.replace(/\{(\w+)\}/g,(all,name)=>String(values[name]??all));
 return source.slice(0,source.length-source.trimStart().length)+result+source.slice(source.trimEnd().length);
}
