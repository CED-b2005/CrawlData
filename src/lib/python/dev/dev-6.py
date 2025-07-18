from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://surfdanang.zone/")
    page.wait_for_timeout(3000)  # đợi JS load
    html = page.content()
    browser.close()

soup = BeautifulSoup(html, "html.parser")

# score ? / 10 
body = soup.select_one("body")

condition = ["địa điểm", "khách mời", "diễn giả", "speaker", "sự kiện", "khởi nghiệp", "startup", "thời gian", "chương trình", "tin tức", "bài viết"]
headings = []

# def find_div_heading (element):
#     children = element.find_all(recursive=False)
#     for child in children:
#         if child.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
#             result = False;
#             for cond in condition:
#                 if cond in child.text.lower():
#                     result = True
#                     break
#             if result:
#                 headings.append(element)
#                 print (child, "   --- True ---" )
#             else:
#                 print (child, "   --- False ---")
#         elif child.find_all(recursive=False):
#             find_div_heading(child)


# for element in body.find_all(recursive=False):
#     find_div_heading(element)

# print("\n\n")
# for heading in headings:
#     print(heading, "\n")

from bs4 import BeautifulSoup
from collections import defaultdict

def get_recursive_signature(element, depth=0, max_depth=5):
    """
    Trả về chữ ký cấu trúc của 1 element, bao gồm các element con đệ quy.
    Giới hạn max_depth để tránh lặp vô hạn.
    """
    if depth > max_depth:
        return None  # tránh đi quá sâu
    
    if not hasattr(element, 'name'):
        return None  # text node, comment...

    tag = element.name
    class_name = " ".join(element.get("class", [])) if element.has_attr("class") else ""
    element_id = element.get("id", "")

    # Lấy chữ ký con đệ quy
    child_signatures = []
    for child in element.find_all(recursive=False):
        child_sig = get_recursive_signature(child, depth+1, max_depth)
        if child_sig:
            child_signatures.append(child_sig)

    return (tag, class_name, element_id, tuple(child_signatures))  # tuple để hash được

def find_nested_structures(html, tag_filter="div"):
    soup = BeautifulSoup(html, "html.parser")
    all_blocks = soup.find_all(tag_filter)  # tìm tất cả div, hoặc section, li...

    structure_map = defaultdict(list)

    for el in all_blocks:
        sig = get_recursive_signature(el)
        if sig:
            structure_map[sig].append(el)

    for i, (sig, elements) in enumerate(structure_map.items(), 1):
        if len(elements) > 1:
            print(f"\n🔷 Nhóm #{i} (Cùng cấu trúc lồng nhau) - {len(elements)} phần tử:")
            print_structure_signature(sig)
            for el in elements:
                print(f"  ▶️ Element: <{el.name}> class='{el.get('class')}' id='{el.get('id')}'")

def print_structure_signature(sig, indent=0):
    tag, cls, eid, children = sig
    print("  " * indent + f"• <{tag}> class='{cls}' id='{eid}'")
    for child in children:
        print_structure_signature(child, indent+1)

find_nested_structures(html)