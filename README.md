!---------- Internship ---------------!
Do when internship in Green System Solution (Da Nang - Vietnam)

//branch [main -> dev] (15/7/2025 11:48)

//branch [dev -> feat/express-base] (15/7/2025 11:51)

//branch [dev -> feat/crawl-data] (15/7/2025 11:45)

# branch feat/crawl-dat:
- this branch building function exec Python in Node.js to crawl data web
- 17/7/2025 builded successful crawl.py (simple) to crawl speakers on https://surfdangnang.zone
- Must create children branch from crawl-data to develop more detail and useful features


# Database
- startup_events
## events
- id
- name
- title
- date?
- info


## event_details
- id
- event_id
- timeline
- info



## speakers
- id
- name
- img
- position
- info


## startups
- id
- name
- project
- logo
- project_img
- info


## investment_funds
- id
- name
- logo
- info


## speaker_event
- speaker_id
- event_id
- note

## investment_fund_event
- investment_fund_id
- event_id
- note

## startup_event
- start_up_id
- event_id
- note



<!-- 
#với database như sau:
    -events(id, name, title, date ? , info, description) -
    -event_details(id, event_id, timeline, info, description) -
    -speakers(id, name, img, position, info, description) -
    -startups(id, name, project, logo, project_img, info, description) -
    -investment_funds(id, name, logo, info, description) -
    -speaker_event(speaker_id, event_id, note) -
    -investment_fund_event(investment_fund_id, event_id, note) -
    -startup_event(start_up_id, event_id, note)

hãy chuyển văn bản vản nhập vào thành lệnh truy vấn database theo mẫu JSON sau:
'''
{
    'from': [from_table],
    'selects': ["*", table_1, ...],
    'columns': [column_1, column_2, ...],
    'values': [value_1, value_2, ...]
}
'''
*selects[0] luôn là '*', còn lại là table liên quan *
    column và value không có thì để[] *
    đầu ra kết quả phải là JSON

văn bản nhập vào: 'truy vấn các speaker tham gia các sự kiện tháng 7'

 -->